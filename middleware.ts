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
    "/research-journal",
    "/about-us",
    "/our-heritage",
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
    "/(event)(.*)",
    "/giving",
    "/api/attend",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
