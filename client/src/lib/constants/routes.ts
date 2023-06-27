export enum ClientRoutes {
  HOME = "/",
  STREAMER_DETAILS = "/streamers/:id",
}

export enum APIRoutes {
  HEALTHCHECK = "/api/healthcheck",
  STREAMERS = "/api/streamers",
  STREAMER = "/api/streamers/:id",
  STREAMER_VOTE = "/api/streamers/:id/vote",
}
