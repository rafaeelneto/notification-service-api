import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @Length(5, 240)
  recipientId: string;

  @IsNotEmpty()
  category: string;
}
