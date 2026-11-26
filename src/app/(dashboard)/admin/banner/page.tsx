import { guardAdminPage } from "@/utils/admin";
import { bannerImageUrl, listBannerImages } from "@/content/banner";
import BannerManager from "@/components/Admin/BannerManager";
import { FormError, PageHeader } from "@/components/Admin/ui";

export default async function BannerPage() {
  await guardAdminPage()
  let images: { key: string, url: string }[] = []
  let error: string | null = null
  try {
    images = (await listBannerImages()).map((image) => ({ key: image.key, url: bannerImageUrl(image) }))
  } catch (e) {
    console.error('Failed to list banner images:', e)
    error = 'Could not list the images in R2. Check the R2_* environment variables.'
  }
  return (
    <>
      <PageHeader title="Banner images" description="Photos revealed under the hero banner, in this order." />
      <FormError error={error} />
      <BannerManager images={images} />
    </>
  )
}
