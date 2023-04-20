<template>
  <div>
    <viewer :url="previewUrl" :options="viewerOptions"></viewer>
  </div>
</template>

<script>
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

export default {
  components: {
    Viewer
  },
  data() {
    return {
      previewUrl: '',
      viewerOptions: {
        navbar: false,
        toolbar: false
      }
    }
  },
  created() {
    this.generatePresignedUrl()
  },
  methods: {
     generatePresignedUrl() {
    //   const response = await fetch(this.shareLink)
    //   const text = await response.text()
      this.previewUrl = "http://120.76.202.102:9000/file/rng.webp?Content-Disposition=attachment%3B%20filename%3D%22rng.webp%22&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20230419%2F%2Fs3%2Faws4_request&X-Amz-Date=20230419T151722Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=985ccdcd327c75aa26a780ddea6199202438fb1bcb4eeb67db30240a6e785fe2".trim()
    }
  }
}
</script>