-- CreateEnum
CREATE TYPE "TransportEnum" AS ENUM ('TRAIN', 'BUS', 'TAXI');

-- CreateTable
CREATE TABLE "FilteredTrainNumbers" (
    "id" TEXT NOT NULL,
    "fromNumber" INTEGER NOT NULL,
    "toNumber" INTEGER NOT NULL,
    "trainLine" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FilteredTrainNumbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationQueue" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "userIds" TEXT[],
    "text" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainLineDelayedPercentage" (
    "lineName" TEXT NOT NULL,
    "trainsRunning" INTEGER NOT NULL,
    "trainsDelayed" INTEGER NOT NULL,
    "percentage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainLineDelayedPercentage_pkey" PRIMARY KEY ("lineName")
);

-- CreateTable
CREATE TABLE "VyNotificationCache" (
    "uuid" TEXT NOT NULL,
    "version" INTEGER,
    "nominalDate" TEXT,
    "trainId" TEXT,
    "lineId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT,
    "state" TEXT,
    "text" TEXT,
    "trainIdWithOperator" TEXT,
    "lineName" TEXT,
    "toStop" JSONB,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "fromStop" JSONB,
    "action" TEXT,

    CONSTRAINT "VyNotificationCache_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "countyNumber" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countyNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificationSubscriptions" (
    "id" TEXT NOT NULL,
    "trainNumber" TEXT,
    "fromStation" TEXT,
    "toStation" TEXT,
    "deviceId" TEXT NOT NULL,
    "days" INTEGER[],
    "fromTime" TEXT,
    "toTime" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pushNotification" BOOLEAN NOT NULL DEFAULT false,
    "latestMessage" VARCHAR(1500),
    "lineName" TEXT[],
    "allStations" TEXT[],
    "trainIds" TEXT[],

    CONSTRAINT "notificationSubscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokenSession" (
    "id" TEXT NOT NULL,
    "access_token" VARCHAR(1500) NOT NULL,
    "expires_in" INTEGER NOT NULL,
    "token_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokenSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainAnnouncement" (
    "ActivityId" TEXT NOT NULL,
    "ActivityType" TEXT NOT NULL,
    "AdvertisedTimeAtLocation" TIMESTAMP(3),
    "EstimatedTimeAtLocation" TIMESTAMP(3),
    "ScheduledDepartureDateTime" TEXT NOT NULL,
    "AdvertisedTrainIdent" TEXT NOT NULL,
    "Canceled" BOOLEAN NOT NULL,
    "Deleted" BOOLEAN NOT NULL,
    "Deviation" JSONB,
    "TimeAtLocation" TIMESTAMP(3),
    "FromLocationSignature" TEXT NOT NULL,
    "LocationSignature" TEXT NOT NULL,
    "InformationOwner" TEXT NOT NULL,
    "ModifiedTime" TIMESTAMP(3),
    "ToLocationSignature" TEXT NOT NULL,
    "ViaLocationCode" TEXT[],
    "Weekday" INTEGER,
    "TrainStatus" TEXT,
    "LineName" TEXT,
    "TrackAtLocation" TEXT,
    "ExternalText" TEXT,
    "InternalText" TEXT,
    "SmsText" TEXT,
    "WebText" TEXT,
    "LocationName" TEXT,
    "FromLocationName" TEXT,
    "ToLocationName" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "AppText" TEXT,
    "TrainId" TEXT NOT NULL DEFAULT '12345',
    "TransportType" "TransportEnum" NOT NULL DEFAULT 'TRAIN'
);

-- CreateTable
CREATE TABLE "trainMessage" (
    "EventId" TEXT NOT NULL,
    "CountyNo" INTEGER[],
    "Deleted" BOOLEAN NOT NULL,
    "ExternalDescription" VARCHAR(1500) NOT NULL,
    "Geometry" JSONB,
    "Header" TEXT,
    "ReasonCode" JSONB,
    "TrafficImpact" JSONB,
    "StartDateTime" TIMESTAMP(3) NOT NULL,
    "PrognosticatedEndDateTimeTrafficImpact" TIMESTAMP(3),
    "LastUpdateDateTime" TIMESTAMP(3) NOT NULL,
    "ModifiedTime" TIMESTAMP(3) NOT NULL,
    "EndDateTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainMessage_pkey" PRIMARY KEY ("EventId")
);

-- CreateTable
CREATE TABLE "trainStations" (
    "LocationSignature" TEXT NOT NULL,
    "AdvertisedLocationName" TEXT NOT NULL,
    "CountyNo" INTEGER NOT NULL,
    "LocationInformationText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainStations_pkey" PRIMARY KEY ("LocationSignature")
);

-- CreateTable
CREATE TABLE "users" (
    "deviceId" TEXT NOT NULL,
    "favoriteTrains" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("deviceId")
);

-- CreateTable
CREATE TABLE "vytogGeneralMessages" (
    "uuid" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "affectedLegs" JSONB,
    "incidentId" TEXT NOT NULL,
    "stretchName" TEXT NOT NULL,
    "vyNotificationCacheUuid" TEXT NOT NULL,

    CONSTRAINT "vytogGeneralMessages_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "vytogNotificationMessages" (
    "id" TEXT NOT NULL,
    "trainNumber" TEXT NOT NULL,
    "message" VARCHAR(1500),
    "trainStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subscriptionId" TEXT,
    "nominalDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vytogNotificationMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_trainStationsTousers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_trainStationsTousers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_usersTovytogNotificationMessages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_usersTovytogNotificationMessages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "NotificationQueue_createdAt_idx" ON "NotificationQueue"("createdAt");

-- CreateIndex
CREATE INDEX "NotificationQueue_processed_createdAt_idx" ON "NotificationQueue"("processed", "createdAt");

-- CreateIndex
CREATE INDEX "VyNotificationCache_nominalDate_idx" ON "VyNotificationCache"("nominalDate");

-- CreateIndex
CREATE INDEX "VyNotificationCache_processed_idx" ON "VyNotificationCache"("processed");

-- CreateIndex
CREATE INDEX "VyNotificationCache_trainIdWithOperator_nominalDate_idx" ON "VyNotificationCache"("trainIdWithOperator", "nominalDate");

-- CreateIndex
CREATE INDEX "VyNotificationCache_trainIdWithOperator_processed_idx" ON "VyNotificationCache"("trainIdWithOperator", "processed");

-- CreateIndex
CREATE INDEX "notificationSubscriptions_days_trainIds_idx" ON "notificationSubscriptions" USING GIN ("days", "trainIds");

-- CreateIndex
CREATE INDEX "notificationSubscriptions_deviceId_idx" ON "notificationSubscriptions"("deviceId");

-- CreateIndex
CREATE INDEX "notificationSubscriptions_fromStation_idx" ON "notificationSubscriptions"("fromStation");

-- CreateIndex
CREATE INDEX "notificationSubscriptions_toStation_idx" ON "notificationSubscriptions"("toStation");

-- CreateIndex
CREATE INDEX "notificationSubscriptions_trainIds_idx" ON "notificationSubscriptions" USING GIN ("trainIds");

-- CreateIndex
CREATE INDEX "notificationSubscriptions_trainNumber_idx" ON "notificationSubscriptions"("trainNumber");

-- CreateIndex
CREATE UNIQUE INDEX "trainAnnouncement_ActivityId_key" ON "trainAnnouncement"("ActivityId");

-- CreateIndex
CREATE INDEX "trainAnnouncement_AdvertisedTrainIdent_ScheduledDepartureDa_idx" ON "trainAnnouncement"("AdvertisedTrainIdent", "ScheduledDepartureDateTime", "AdvertisedTimeAtLocation");

-- CreateIndex
CREATE INDEX "trainAnnouncement_AdvertisedTrainIdent_idx" ON "trainAnnouncement"("AdvertisedTrainIdent");

-- CreateIndex
CREATE INDEX "trainAnnouncement_LocationName_ScheduledDepartureDateTime_A_idx" ON "trainAnnouncement"("LocationName", "ScheduledDepartureDateTime", "AdvertisedTimeAtLocation");

-- CreateIndex
CREATE INDEX "trainAnnouncement_TimeAtLocation_idx" ON "trainAnnouncement"("TimeAtLocation");

-- CreateIndex
CREATE INDEX "trainAnnouncement_ToLocationSignature_FromLocationSignature_idx" ON "trainAnnouncement"("ToLocationSignature", "FromLocationSignature");

-- CreateIndex
CREATE UNIQUE INDEX "vytogGeneralMessages_incidentId_key" ON "vytogGeneralMessages"("incidentId");

-- CreateIndex
CREATE INDEX "_trainStationsTousers_B_index" ON "_trainStationsTousers"("B");

-- CreateIndex
CREATE INDEX "_usersTovytogNotificationMessages_B_index" ON "_usersTovytogNotificationMessages"("B");

-- AddForeignKey
ALTER TABLE "notificationSubscriptions" ADD CONSTRAINT "notificationSubscriptions_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "users"("deviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainAnnouncement" ADD CONSTRAINT "trainAnnouncement_LocationSignature_fkey" FOREIGN KEY ("LocationSignature") REFERENCES "trainStations"("LocationSignature") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainStations" ADD CONSTRAINT "trainStations_CountyNo_fkey" FOREIGN KEY ("CountyNo") REFERENCES "countyNumber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vytogGeneralMessages" ADD CONSTRAINT "vytogGeneralMessages_vyNotificationCacheUuid_fkey" FOREIGN KEY ("vyNotificationCacheUuid") REFERENCES "VyNotificationCache"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vytogNotificationMessages" ADD CONSTRAINT "vytogNotificationMessages_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "notificationSubscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_trainStationsTousers" ADD CONSTRAINT "_trainStationsTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "trainStations"("LocationSignature") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_trainStationsTousers" ADD CONSTRAINT "_trainStationsTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("deviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_usersTovytogNotificationMessages" ADD CONSTRAINT "_usersTovytogNotificationMessages_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("deviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_usersTovytogNotificationMessages" ADD CONSTRAINT "_usersTovytogNotificationMessages_B_fkey" FOREIGN KEY ("B") REFERENCES "vytogNotificationMessages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
