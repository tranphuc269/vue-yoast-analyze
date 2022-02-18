<template>
  <div id="app" :class="{'is-rtl': locale === 'vi_VN' }">
    <div header="Đánh giá nội dung" class="mb-2" id="seo-assessor" v-if="bodyOnly">
        <content-assessor
          :title="metaTitle"
          :titleWidth="titleWidth"
          :description="metaDescription"
          :url="url"
          :text="description"
          :locale="locale"
          :translations="translations"
          :resultFilter="assessorResultFilter" />
      </div>
      <div header="Đánh giá từ khoá" v-if="keywordOnly">
        <div v-for="(keyword, index) in focusKeywords.split(',').map(String)" :key="index" class="mb-2">
          <seo-assessor
              :keyword="keyword"
              :title="metaTitle"
              :titleWidth="titleWidth"
              :description="metaDescription"
              :url="url"
              :text="description"
              :locale="locale"
              :translations="translations"
              :resultFilter="assessorResultFilter" />
        </div>
      </div>
  </div>
</template>

<script>
import { SnippetPreview, ContentAssessor, SeoAssessor } from '../src'
import YoastSeoViVn from './languages/vi_VN.json'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    ContentAssessor,
    SeoAssessor,
    SnippetPreview
  },
  data () {
    return {
      focusKeywords: '',
      metaTitle: '',
      metaDescription: '',
      bodyOnly: false,
      keywordOnly: false,
      url: '',
      description: '',
      titleWidth: 160,
      titleLengthPercent: 0,
      descriptionLengthPercent: 0,
      translations: YoastSeoViVn,
      locale: 'en_US',
      localeOptions: [
        {
          text: 'en_US',
          value: 'en_US'
        },
        {
          text: 'vi_VN',
          value: 'vi_VN'
        }
      ]
    }
  },
  watch: {
    locale (newVal) {
      if (newVal === 'vi_VN') {
        this.translations = YoastSeoViVn
      } else {
        this.translations = null
      }
    }
  },
  methods: {
    ...mapMutations(['resetRes']),
    assessorResultFilter (value) {
      return value
    },
    receiveMessage (event) {
      if (event.data.MetaTitle != null) {
        this.resetRes()
        this.metaTitle = event.data.MetaTitle
        this.focusKeywords = event.data.MetaKeywords
        this.description = event.data.FullDescription
        this.metaDescription = event.data.MetaDescription
        this.keywordOnly = event.data.keywordOnly
        this.bodyOnly = event.data.bodyOnly
      }
    }
  },
  mounted () {
    window.addEventListener('message', this.receiveMessage)
  },
  beforeDestroy () {
    window.removeEventListener('message', this.receiveMessage)
  }
}
</script>

<style>
#app {
  background-color: #eee;
}
#seo-assessor{
  padding: 10px;
}
h1{
  margin: 10px;
  font-size: 2em;
}
</style>
