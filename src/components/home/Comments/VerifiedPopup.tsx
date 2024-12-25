import type { FC } from "react";
import dynamic from "next/dynamic";

import styles from "./VerifiedPopup.module.scss";

const Popup = dynamic(() => import("@/components/dynamic/Popup"), {
  ssr: false,
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * VerifiedPopup component displays information regarding the verification process of reviews.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Determines if the popup is open
 * @param {Function} props.onClose - Function to call when the popup is closed
 */
export const VerifiedPopup: FC<Props> = ({ isOpen, onClose }): JSX.Element => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} size="large">
      <div className={styles.wrapper}>
        <p className={styles.title}>
          Unser Verfahren zur Überprüfung von Bewertungen
        </p>
        <p className={styles.description}>
          Bei cupid nehmen wir es sehr ernst, die Gültigkeit und Relevanz jeder
          Bewertung auf unserer Website zu gewährleisten. Jede Bewertung, die
          auf unserer Plattform veröffentlicht wird, wird manuell überprüft.
          Zudem stehen unsere Bewertungen allen Nutzern offen, unabhängig von
          ihrer Kaufhistorie. Wenn eine Bewertung als relevant und
          aufschlussreich eingestuft wird, wird sie als &quot;Verifizierte
          Bewertung&quot; gekennzeichnet. Alle Bewertungen müssen jedoch unserer
          Relevanzprüfung bestehen, erst dann werden sie freigegeben und
          anschließend als „Verifizierte Bewertung” gekennzeichnet.
        </p>
      </div>
    </Popup>
  );
};
