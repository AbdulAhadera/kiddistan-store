'use server'
import { getProductBySlug } from '@/services/products'

export async function fetchProduct(slug) {
  try {
    const product = await getProductBySlug(slug)
    return { data: product, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}


