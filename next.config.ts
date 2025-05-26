import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		}
	}
};

export default nextConfig;
