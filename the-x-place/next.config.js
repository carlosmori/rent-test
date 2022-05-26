/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://ndcpkdxpiyjtuvcoyomi.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kY3BrZHhwaXlqdHV2Y295b21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMzMjg5NzgsImV4cCI6MTk2ODkwNDk3OH0.ffN4vei43WSHw4MecUrcZ7AVbQM6AOJi2f7WdpBCIjc",
    DB_PASSWORD: "$mguY4XcrzaLyaF",
  },
};

module.exports = nextConfig;
