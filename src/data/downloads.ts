/**
 * Download host, tag, and filenames. Change origin to move files off GitHub.
 */
export const DOWNLOAD = {
  origin: 'https://github.com/lyrabrowserhq/lyra/releases/download',
  latestApi: 'https://api.github.com/repos/lyrabrowserhq/lyra/releases/latest',
  page: '/download',
  tag: 'v0.5.0',
  version: '0.5.0',
  linux: {
    file: 'lyra-0.5.0-linux-x86_64.tar.xz',
    size: 500693892,
    sha256: 'bed2fba2786ded31377da0940d8c267c9e7279a51692e099ecfd4bd905d42086',
  },
  windows: {
    file: 'lyra-0.5.0-windows-x86_64.zip',
    size: 122825544,
    sha256: '0dd79a12338dff783aa4247e9584590700db17a1e3e59863153a7bccfe9231a8',
  },
} as const;

export type DownloadKind = 'linux' | 'windows';

export type DownloadAsset = {
  id: DownloadKind | 'android';
  name: string;
  icon: string;
  hint: string;
  href?: string;
  size?: number;
  sha256?: string;
  comingSoon?: boolean;
};

type ReleaseAsset = {
  name?: string;
  size?: number;
  digest?: string;
  browser_download_url?: string;
};

export function downloadUrl(kind: DownloadKind): string {
  return `${DOWNLOAD.origin}/${DOWNLOAD.tag}/${DOWNLOAD[kind].file}`;
}

type ResolvedDownload = {
  href: string;
  size: number;
  sha256: string;
};

function fallback(kind: DownloadKind): ResolvedDownload {
  return {
    href: downloadUrl(kind),
    size: DOWNLOAD[kind].size,
    sha256: DOWNLOAD[kind].sha256,
  };
}

function digestHex(digest: string | undefined): string {
  if (!digest) {
    return '';
  }
  return digest.replace(/^sha256:/i, '').toLowerCase();
}

function fromRelease(asset: ReleaseAsset | undefined, kind: DownloadKind): ResolvedDownload {
  const sha256 = digestHex(asset?.digest);
  if (!asset?.browser_download_url || !asset.size || sha256.length !== 64) {
    return fallback(kind);
  }
  return {
    href: asset.browser_download_url,
    size: asset.size,
    sha256,
  };
}

export function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)} GB`;
  }
  return `${mb.toFixed(1)} MB`;
}

export async function loadDownloads(): Promise<DownloadAsset[]> {
  let linux = fallback('linux');
  let windows = fallback('windows');
  try {
    const res = await fetch(DOWNLOAD.latestApi, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (res.ok) {
      const data = (await res.json()) as { assets?: ReleaseAsset[] };
      const assets = Array.isArray(data.assets) ? data.assets : [];
      linux = fromRelease(
        assets.find((asset) => /linux-x86_64\.tar\.xz$/i.test(asset.name || '')),
        'linux'
      );
      windows = fromRelease(
        assets.find((asset) => /windows-x86_64\.zip$/i.test(asset.name || '')),
        'windows'
      );
    }
  } catch {
    linux = fallback('linux');
    windows = fallback('windows');
  }

  return [
    {
      id: 'linux',
      name: 'Linux',
      icon: 'linux',
      hint: 'Download, unpack, and run. No installer.',
      ...linux,
    },
    {
      id: 'windows',
      name: 'Windows',
      icon: 'windows',
      hint: 'Download the zip, open the folder, and run Lyra Browser. No installer.',
      ...windows,
    },
    {
      id: 'android',
      name: 'Android',
      icon: 'android',
      hint: 'An Android build is in the works. Linux and Windows are available now.',
      comingSoon: true,
    },
  ];
}
