export default function useRefreshInterval() {
  const NEXT_PUBLIC_REFRESH_IN_MS = parseInt(
    process.env.NEXT_PUBLIC_REFRESH_IN_MS || "10000",
    10
  );

  return NEXT_PUBLIC_REFRESH_IN_MS;
}
