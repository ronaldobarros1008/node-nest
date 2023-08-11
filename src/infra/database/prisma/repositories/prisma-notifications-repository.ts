import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-reposiory";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMappe } from "../mappers/prisma-notification-mapper";


@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prisma: PrismaService) { }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId
            },
        });

        if (!notification) {
            return null
        }

        return PrismaNotificationMappe.toDomain(notification);
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notification = await this.prisma.notification.findMany({
            where: {
                recipientId,
            },
        });

        return notification.map(PrismaNotificationMappe.toDomain);
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId,
            },
        });

        return count;
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMappe.toPrisma(notification);

        await this.prisma.notification.create({
            data: raw,
        })
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMappe.toPrisma(notification);

        await this.prisma.notification.update({
            where: {
                id: raw.id,
            },
            data: raw,
        });
    }
}