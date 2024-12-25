import { useEffect, useState } from "react";

import type { CommentType } from "@/types";
import { useGetCommentsQuery, useRatingQuery } from "@/lib/slices/api";

export function useComments(pageId: string) {
  const [offset, setOffset] = useState<string>("0");
  const [comments, setComments] = useState<CommentType[]>([]);
  const { data: rating } = useRatingQuery(pageId);
  const { data, isFetching } = useGetCommentsQuery({ pageId, offset });

  useEffect(() => {
    if (data?.comments.length) {
      setComments((prevComments) => {
        const newComments = new Set([...prevComments, ...data.comments]);
        return Array.from(newComments);
      });
    }
  }, [data]);

  return {
    comments,
    rating,
    offset,
    setOffset,
    isFetching,
    totalComments: data?.total || 0,
  };
}
