import Script from 'next/script';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  type?: string;
}

export function SEOHead({ title, description, canonicalUrl, type = 'website' }: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ohg365.com';
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={fullUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}

export function SiteNavigationJSONLD() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ohg365.com';

  const navigationStructure = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: siteUrl,
    hasPart: [
      {
        '@type': 'SiteNavigationElement',
        name: 'Home',
        url: `${siteUrl}/`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'MENU',
        url: `${siteUrl}/menu`,
        hasPart: [
          {
            '@type': 'SiteNavigationElement',
            name: 'Learning Paths',
            url: `${siteUrl}/menu/learning-paths`,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'Projects Hub',
            url: `${siteUrl}/menu/projects`,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'Practice Zone',
            url: `${siteUrl}/menu/practice`,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'Resources',
            url: `${siteUrl}/menu/resources`,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'Career Hub',
            url: `${siteUrl}/menu/career`,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'Community',
            url: `${siteUrl}/menu/community`,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'About / Support',
            url: `${siteUrl}/about`,
          },
        ],
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Tutorials',
        url: `${siteUrl}/tutorials`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Terminal',
        url: `${siteUrl}/terminal`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Challenges',
        url: `${siteUrl}/challenges`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Apply Jobs',
        url: `${siteUrl}/apply-jobs`,
      },
    ],
  };

  return (
    <Script
      id="site-navigation-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationStructure) }}
    />
  );
}

