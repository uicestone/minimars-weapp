declare module "vue/types/vue" {
  interface Vue {
    navigateTo: () => Promise<void>;
  }
}
