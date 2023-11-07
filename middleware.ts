import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },

  publicRoutes: [
    "/",
    "/unauthorised",
    "/sign-in",
    "/sign-up",
    "/courses",
    "/(course)(.*)",
    "/resources",
    "/about-us",
    "/our-beliefs",
    "/terms-of-service",
    "/privacy-policy",
    "/mission-statement",
    "/leadership",
    "/partners",
    "/scholarships",
    "/unsubscribe",
    "/tuition",
    "/outcomes",
    "/application-requirements",
    "/events",
    "/giving",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
