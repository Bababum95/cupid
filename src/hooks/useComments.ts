import { useEffect, useState } from "react";

import type { CommentType, GetCommentsParams } from "@/types";
import { useGetCommentsQuery, useRatingQuery } from "@/lib/slices/api";

export function useComments(pageId: string) {
  const [params, setParams] = useState<GetCommentsParams>({ pageId });
  const [comments, setComments] = useState<CommentType[]>([]);
  const { data: rating } = useRatingQuery(pageId);
  const { data, isFetching } = useGetCommentsQuery(params);

  useEffect(() => {
    if (data?.comments.length) {
      setComments((prevComments) => {
        const newComments = new Set([...prevComments, ...data.comments]);
        return Array.from(newComments);
      });
    }
  }, [data]);

  const loadMore = () => {
    if (!comments.length) return;

    setParams((prev) => ({
      ...prev,
      offset: comments.length.toString(),
    }));
  };

  const filterByRating = (n: number) => {
    const s = n.toString();
    if (!rating || !rating[n] || s === params.rating) return;

    setComments([]);
    setParams({
      offset: "0",
      rating: s,
      pageId,
    });
  };

  return {
    comments,
    rating,
    loadMore,
    filterByRating,
    isFetching,
    totalComments: data?.total || 0,
  };
}
