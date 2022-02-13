<template>
  <div id="app" :class="{'is-rtl': locale === 'vi_VN' }">
    <b-container>
      <b-row>
        <b-col sm="12">
          <h1>
            <a>Phân tích yoastseo</a>
          </h1>
        </b-col>
        <b-col >
          <!-- <b-card class="mb-2">
            <b-form-group label="Tiêu đề">
              <b-form-input v-model="metaTitle" />
            </b-form-group>

            <b-form-group label="Từ khoá liên quan">
              <b-form-input v-model="focusKeywords" />
            </b-form-group>

            <b-form-group label="Mô tả ngắn gọn sản phẩm">
              <b-form-textarea v-model="metaDescription" />
            </b-form-group>

            <b-form-group label="Link sản phẩm">
              <b-form-textarea v-model="url" />
            </b-form-group>

            <b-form-group label="Mô tả chi tiết sản phẩm">
              <ckeditor :editor="editor" v-model="description" />
            </b-form-group>

            <b-form-group label="Locale">
              <b-form-select v-model="locale" :options="localeOptions" class="mb-3" size="sm" />
            </b-form-group>
          </b-card>

          <b-card header="Snippet Preview" class="mb-2">
            <snippet-preview
              :title="metaTitle"
              :description="metaDescription"
              :url="url"
              @update:titleWidth="(value) => titleWidth = value"
              @update:titleLengthPercent="(value) => titleLengthPercent = value"
              @update:descriptionLengthPercent="(value) => descriptionLengthPercent = value" />
          </b-card> -->
          <b-form-group label="Locale">
              <b-form-select v-model="locale" :options="localeOptions" class="mb-3" size="sm" />
            </b-form-group>
          <b-card header="Đánh giá nội dung" class="mb-2" id="seo-assessor">
            <content-assessor
              :title="metaTitle"
              :titleWidth="titleWidth"
              :description="metaDescription"
              :url="url"
              :text="description"
              :locale="locale"
              :translations="translations"
              :resultFilter="assessorResultFilter" />
          </b-card>

          <!-- <b-card header="SEO Assessor" class="mb-2">
              <seo-assessor
                  :keyword="focusKeyword"
                  :title="metaTitle"
                  :titleWidth="titleWidth"
                  :description="metaDescription"
                  :url="url"
                  :text="description"
                  :locale="locale"
                  :translations="translations"
                  :resultFilter="assessorResultFilter" />
          </b-card> -->

          <b-card header="Đánh giá từ khoá">
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
            <!-- <b-tabs card>
              <b-tab
                v-for="(focusKeyword, index) in focusKeywords.split(',').map(String)"
                :key="index"
              >
                <h1>focusKeyword</h1>
                <seo-assessor
                  :keyword="focusKeyword"
                  :title="metaTitle"
                  :titleWidth="titleWidth"
                  :description="metaDescription"
                  :url="url"
                  :text="description"
                  :locale="locale"
                  :translations="translations"
                  :resultFilter="assessorResultFilter" />
              </b-tab>
            </b-tabs> -->
          </b-card>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { SnippetPreview, ContentAssessor, SeoAssessor } from '../src'
import { CKEditor, ClassicEditor } from 'ckeditor4-vue'
import YoastSeoViVn from './languages/vi_VN.json'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    ContentAssessor,
    SeoAssessor,
    SnippetPreview,
    CKEditor
  },
  data () {
    return {
      editor: ClassicEditor,
      focusKeywords: '',
      metaTitle: '',
      metaDescription: '',
      url: '',
      description: '',
      titleWidth: 160,
      titleLengthPercent: 0,
      descriptionLengthPercent: 0,
      translations: null,
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
      this.resetRes()
      this.metaTitle = event.data.MetaTitle
      this.focusKeywords = event.data.MetaKeywords
      this.description = event.data.FullDescription
      this.metaDescription = event.data.MetaDescription
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
