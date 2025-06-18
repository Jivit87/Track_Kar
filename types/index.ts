export type PriceHistoryItem = {
    price: number;
    date?: Date; 
}

export type User = {
    email: string;
    name?: string; 
}

export type Product = {
    _id?: string;
    url: string;
    currency: string;
    image: string;
    title: string;
    currentPrice: number;
    originalPrice: number; 
    priceHistory: PriceHistoryItem[] | []; // | in typescript, A | B means the value can be either type A or type B 
    highestPrice: number;
    lowestPrice: number;
    averagePrice: number;
    discountRate: number;
    category: string;
    reviewsCount: number;
    stars: number;
    isOutOfStock: Boolean;
    users?: User[];
}

export type NotificationType = 
    | "WELCOME" 
    | "CHANGE_OF_STOCK" 
    | "LOWEST_PRICE" 
    | "THRESHOLD_MET";

export type EmailContent = {
    subject: string;
    body: string;
}

export type EmailProductInfo = {
    title: string;
    url: string;
    currentPrice?: number;
    originalPrice?: number;
    currency?: string;
    image?: string;
    discountRate?: number;
    isOutOfStock?: boolean;
    category?: string;
    stars?: number;
    reviewsCount?: number;
}

export type EmailTemplateData = {
    product: EmailProductInfo;
    user?: {
        name?: string;
        email: string;
    };
    notification: {
        type: NotificationType;
        threshold?: number; // For threshold notifications
        previousPrice?: number; // For price change context
    };
}

export type EmailNotificationPreferences = {
    welcomeEmails: boolean;
    stockAlerts: boolean;
    priceDrops: boolean;
    thresholdAlerts: boolean;
    customThreshold?: number; 
}

export type EnhancedUser = User & {
    preferences?: EmailNotificationPreferences;
    createdAt?: Date;
    lastNotified?: Date;
}

export type EmailTemplateConfig = {
    brandName: string;
    brandColor: string;
    supportEmail: string;
    unsubscribeUrl?: string;
    logoUrl?: string;
}

export type EmailAnalytics = {
    emailId: string;
    userId: string;
    productId: string;
    notificationType: NotificationType;
    sentAt: Date;
    opened?: Date;
    clicked?: Date;
    converted?: Date; 
}