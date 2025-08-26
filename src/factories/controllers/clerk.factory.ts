import { ClerkAuthController } from '../../controllers/clerk-auth-controller.ts'

export function makeClerkAuthController() {
  const clerkAuthController = new ClerkAuthController()

  return { clerkAuthController }
}
