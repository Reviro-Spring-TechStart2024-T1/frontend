import { useParams } from 'next/navigation';

import { Comment } from '@/entities/comment';
import { useGetPost } from '@/shared';
import { Typography } from '@/shared/ui';

export const CommentsList = () => {
  const params = useParams<{ id: string }>();
  const { post } = useGetPost(params.id);

  return (
    <div className="rounded-md border border-theme-grey-200 p-6">
      <Typography variant="paragraph">
        {post?.comments.length} Answers
      </Typography>

      <hr className="my-6" />

      {post?.comments.map((comment, index) => {
        return (
          <div key={index}>
            <Comment {...comment} key={index} />
            {post.comments.length - 1 !== index ? (
              <hr className="my-6" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
