<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([`close`])

function onUpdate(val: boolean) {
  if (!val) {
    emit(`close`)
  }
}

const links = [
  { label: `GitHub 仓库`, url: `https://github.com/doocs/md` },
  { label: `Gitee 仓库`, url: `https://gitee.com/doocs/md` },
  { label: `GitCode 仓库`, url: `https://gitcode.com/doocs/md` },
]

function onRedirect(url: string) {
  window.open(url, `_blank`)
}
</script>

<template>
  <Dialog :open="props.visible" @update:open="onUpdate">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>关于</DialogTitle>
      </DialogHeader>
      <div class="text-center">
        <h3>一款高度简洁的微信 Markdown 编辑器</h3>
        <p>
          访问<a 
            href="https://www.ayi001.xyz" 
            target="_blank" 
            class="text-blue-500 hover:text-blue-600 underline"
          >www.ayi001.xyz</a>，获取更多AI工具、教程、资源
        </p>
        <img
          class="mx-auto my-5"
          src="https://n8jmply6oexq.meoo.fun/sb-api/storage/v1/object/public/ayi_oss/public/1778544276186-touxiang_ayi_cat_touming.png"
          alt="阿一AI站"
          style="width: 40%"
        >
      </div>
      <DialogFooter class="sm:justify-evenly flex flex-wrap gap-2">
        <Button
          v-for="link in links"
          :key="link.url"
          @click="onRedirect(link.url)"
        >
          {{ link.label }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
