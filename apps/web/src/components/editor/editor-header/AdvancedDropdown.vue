<script setup lang="ts">
import { Bot, Globe, Layers, Package, Sliders } from 'lucide-vue-next'
import { useEditorStore } from '@/stores/editor'
import { useExportStore } from '@/stores/export'
import { useUIStore } from '@/stores/ui'

const props = withDefaults(defineProps<{
  asSub?: boolean
}>(), {
  asSub: false,
})

const emit = defineEmits([`openAbout`])

const { asSub } = toRefs(props)

const editorStore = useEditorStore()
const exportStore = useExportStore()
const uiStore = useUIStore()

const importMarkdownContent = useImportMarkdownContent()

function openAYISite() {
  window.open('https://ayi-ai.com', '_blank')
}

function openAboutDialog() {
  emit(`openAbout`)
}

function openTemplateDialog() {
  uiStore.toggleShowTemplateDialog(true)
}

// 导入文章
function importArticle() {
  importMarkdownContent()
}

// 导出文章
function exportArticle() {
  exportStore.exportEditorContent2MD(editorStore.getContent())
}
</script>

<template>
  <!-- 作为 MenubarSub 使用 -->
  <MenubarSub v-if="asSub">
    <MenubarSubTrigger>
      高级
    </MenubarSubTrigger>
    <MenubarSubContent align="start">
      <!-- 导入文章 -->
      <MenubarItem @click="importArticle()">
        <Package class="mr-2 h-4 w-4" />
        导入文章
      </MenubarItem>

      <!-- 导出文章 -->
      <MenubarItem @click="exportArticle()">
        <Layers class="mr-2 h-4 w-4" />
        导出文章
      </MenubarItem>

      <!-- 文章模板管理 -->
      <MenubarItem @click="openTemplateDialog()">
        <Sliders class="mr-2 h-4 w-4" />
        文章模板管理
      </MenubarItem>

      <MenubarSeparator />

      <!-- 阿一AI站 -->
      <MenubarItem @click="openAYISite()">
        <Globe class="mr-2 h-4 w-4" />
        阿一AI站
      </MenubarItem>

      <!-- 关于 -->
      <MenubarItem @click="openAboutDialog()">
        <Bot class="mr-2 h-4 w-4" />
        关于
      </MenubarItem>
    </MenubarSubContent>
  </MenubarSub>

  <!-- 作为 MenubarMenu 使用（默认） -->
  <MenubarMenu v-else>
    <MenubarTrigger>高级</MenubarTrigger>
    <MenubarContent align="start">
      <!-- 导入文章 -->
      <MenubarItem @click="importArticle()">
        <Package class="mr-2 h-4 w-4" />
        导入文章
      </MenubarItem>

      <!-- 导出文章 -->
      <MenubarItem @click="exportArticle()">
        <Layers class="mr-2 h-4 w-4" />
        导出文章
      </MenubarItem>

      <!-- 文章模板管理 -->
      <MenubarItem @click="openTemplateDialog()">
        <Sliders class="mr-2 h-4 w-4" />
        文章模板管理
      </MenubarItem>

      <MenubarSeparator />

      <!-- 阿一AI站 -->
      <MenubarItem @click="openAYISite()">
        <Globe class="mr-2 h-4 w-4" />
        阿一AI站
      </MenubarItem>

      <!-- 关于 -->
      <MenubarItem @click="openAboutDialog()">
        <Bot class="mr-2 h-4 w-4" />
        关于
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</template>
