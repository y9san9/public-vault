import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "GitHub": "https://github.com/y9san9/public-vault",
      "Telegram": "https://t.me/y9san9",
      "Email": "mailto:y9san9@gmail.com",
    },
  }),
}

const graph = Component.Graph({
  localGraph: {
    drag: true, // whether to allow panning the view around
    zoom: true, // whether to allow zooming in and out
    depth: 1, // how many hops of notes to display
    scale: 0.9, // default view scale
    repelForce: 2, // how much nodes should repel each other
    centerForce: 0.3, // how much force to use when trying to center the nodes
    linkDistance: 60, // how long should the links be by default?
    fontSize: 0.6, // what size should the node labels be?
    opacityScale: 3, // how quickly do we fade out the labels when zooming out?
    removeTags: [], // what tags to remove from the graph
    showTags: true, // whether to show tags in the graph
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 2,
    centerForce: 0.3,
    linkDistance: 60,
    fontSize: 0.6,
    opacityScale: 3,
    removeTags: [], // what tags to remove from the graph
    showTags: true, // whether to show tags in the graph
  },
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  afterBody: [
    Component.MobileOnly(Component.Backlinks()),
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'y9san9/public-vault',
        // from data-repo-id
        repoId: 'R_kgDOM15F1A',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDOM15F1M4CivVq',
      }
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Darkmode(),
    Component.Search(),
    Component.DesktopOnly(Component.RecentNotes({
      title: "Updated Recently",
      limit: 5
    })),
  ],
  right: [
    Component.DesktopOnly(graph),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Backlinks()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Darkmode(),
    Component.Search()
  ],
  right: [],
}
