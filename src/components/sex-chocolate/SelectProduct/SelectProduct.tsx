"use client";

import { FC, useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

import type {
  ProductType,
  VariantProductType,
  GiftType,
  CreateCartInput,
} from "@/types";
import { BackButton, ProductGallery, ProductInfo } from "@/components";
import { useAppDispatch } from "@/hooks";
import { getCookie } from "@/utils";
import { useRouter } from "@/i18n/routing";
import { create as createCart } from "@/lib/slices/cart";

import type { SellingPlanGroupType } from "./types";
import { STEP_VARIANTS } from "./config";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { fetchInitialData } from "./fetchInitialData";
import styles from "./SelectProduct.module.scss";

type Props = {
  products: ProductType[];
  gifts: string[];
};

export const SelectProduct: FC<Props> = ({ products, gifts }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const t = useTranslations("SexChocolate");
  const [selectedVariant, setSelectedVariant] =
    useState<VariantProductType | null>(null);
  const [step, setStep] = useState<string | null>(searchParams.get("step"));
  const [giftsData, setGiftsData] = useState<GiftType[]>([]);
  const [sellingPlans, setSellingPlans] = useState<SellingPlanGroupType[]>([]);
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const mainVariant = products[0].variants[0];

  const getInitialData = async () => {
    const initialData = await fetchInitialData({ gifts, locale });

    if (!initialData) return;

    setGiftsData(initialData.gifts);
    setSellingPlans(initialData.sellingPlans);
  };

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchParams.get("step") === "2") {
      setStep("2");
      if (!selectedVariant) {
        const quantity = parseFloat(searchParams.get("quantity") || "1");
        if (quantity === 1) {
          setSelectedVariant(mainVariant);
        } else {
          const selectedProduct = products.find(
            (product) =>
              product.variants[0].components.length &&
              product.variants[0].components[0].quantity === quantity
          );

          if (selectedProduct) setSelectedVariant(selectedProduct.variants[0]);
        }
      }
    } else {
      setStep("1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const nextStep = async () => {
    if (!selectedVariant) return;
    // setStep("2");
    // const params = new URLSearchParams();
    // params.set("step", "2");
    // if (selectedVariant.components.length) {
    //   params.set(
    //     "quantity",
    //     selectedVariant.components[0].quantity!.toString()
    //   );
    // }

    // router.push(`/sex-chocolate?${params.toString()}`, {
    //   scroll: false,
    // });

    const input: CreateCartInput = {
      lines: [{ merchandiseId: selectedVariant.id, quantity: 1 }],
      discountCodes: [],
      attributes: [{ key: "Site version", value: "1" }],
    };

    const referrer = getCookie("referrer");
    if (referrer) {
      input.attributes?.push({ key: "Referrer", value: referrer });
    }

    if (selectedVariant.components.length) {
      input.lines.push({ merchandiseId: giftsData[0].id, quantity: 1 });
      if (giftsData[0].code) input.discountCodes.push(giftsData[0].code);
    }

    const res = await dispatch(createCart({ input, locale }));

    if (res.meta.requestStatus === "fulfilled") {
      router.push("/cart");
    } else {
      console.log(res);
    }
  };

  const onSelectVariant = (data: VariantProductType) => {
    setSelectedVariant(data);

    const quantity = data.components[0]?.quantity || 1;
    const slides = document.querySelectorAll(".swiper-slide");

    if (!slides) return;

    const slideIndex = Array.from(slides).findIndex(
      (slide) =>
        slide.getAttribute("data-swiper-slide-index") === `1${quantity - 1}`
    );

    if (slideIndex === -1) return;

    setCurrentImage(slideIndex);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery} aria-label="Product images">
        <ProductGallery
          currentImage={currentImage}
          locale={locale === "en" ? "en" : "de"}
        />
      </div>
      <div className={styles.summary}>
        <div className={styles.back}>
          <BackButton />
        </div>
        <AnimatePresence initial={false}>
          {step === "2" ? (
            <motion.div
              key="step-2"
              variants={STEP_VARIANTS}
              animate="visible"
              exit="hidden"
              initial="hidden"
            >
              <h2 className={styles.h2}>{t("title-2")}</h2>
              <StepTwo
                mainProduct={mainVariant}
                selectedVariant={selectedVariant || mainVariant}
                sellingPlans={sellingPlans}
                gifts={giftsData}
                locale={locale}
              />
            </motion.div>
          ) : (
            <motion.div
              key="step-1"
              variants={STEP_VARIANTS}
              animate="visible"
              exit="hidden"
              initial="hidden"
              className={styles.step}
            >
              <h2 className={styles.h2}>{t("title-1")}</h2>
              <StepOne
                products={products}
                gifts={giftsData}
                setSelectedVariant={onSelectVariant}
                selectedVariant={selectedVariant}
                nextStep={nextStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <ProductInfo />
      </div>
    </div>
  );
};
