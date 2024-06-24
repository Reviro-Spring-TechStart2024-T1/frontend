import { dateToRelative } from '@/shared';
import { Typography } from '@/shared/ui';
import { Avatar } from '@/shared/ui/Avatar';

import { Comment as CommentType } from '../types';

export const Comment = (props: CommentType) => {
  const { message, author, created_at } = props;

  return (
    <div className="space-y-4">
      <div className="inline-flex space-x-2">
        <Avatar
          avatar={author.avatar}
          alt="User"
          name={author.first_name}
          className="mt-1"
        />

        <div>
          <Typography variant="paragraph" color="blue">
            {author.first_name} {author.last_name}
          </Typography>
          <Typography variant="caption" color="grey">
            {dateToRelative(created_at)}
          </Typography>
        </div>
      </div>

      <Typography variant="caption">{message}</Typography>
    </div>
  );
};
