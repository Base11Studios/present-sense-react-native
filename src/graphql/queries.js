/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUsageStatistics = `query GetUsageStatistics($id: ID!) {
  getUsageStatistics(id: $id) {
    appOpenedCount
    versionNumber
  }
}
`;
export const listUsageStatisticss = `query ListUsageStatisticss(
  $filter: ModelUsageStatisticsFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsageStatisticss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      appOpenedCount
      versionNumber
    }
    nextToken
  }
}
`;
