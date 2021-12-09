import { MainLayout } from "app/layout";
import {  BlogPosts } from "app/containers";
import { ModalProvider, PostProvider } from "app/providers";

/**
 *
 * Routes, Providers, etc can also be declared here
 */

export const App = () => {
  // When have multiple routes place it in
  return (
    <PostProvider>
      <ModalProvider>
        <MainLayout>
          <BlogPosts />
        </MainLayout>
      </ModalProvider>
    </PostProvider>
  );
};
