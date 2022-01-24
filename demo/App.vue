<template>
  <div id="app" :class="{'is-rtl': locale === 'fa_IR' }">
    <b-container>
      <b-row>
        <b-col sm="12">
          <h1>
            <a href="https://github.com/meyt/vue-yoast">Analyze content </a>yoast seo 1.90
          </h1>
        </b-col>
        <b-col >
          <b-card class="mb-2">
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
              <b-form-textarea v-model="description" />
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
          </b-card>

          <b-card header="Content Assessor" class="mb-2">
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

          <b-card header="SEO Assessor" class="mb-2">
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
          </b-card>

          <b-card header="SEO Assessor" class="mb-2" no-body>
            <b-tabs card>
              <b-tab
                v-for="(focusKeyword, index) in focusKeywords.split(' ').map(String)"
                :key="index"
                :title="'FocusKeyword ' + (index + 1)"
              >
                <h1>ababab</h1>
                <b-form-group label="Focus Keyword">
                  <b-form-textarea v-model="focusKeywords.split(' ').map(String)[index]" />
                </b-form-group>

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
            </b-tabs>
          </b-card>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { SnippetPreview, ContentAssessor, SeoAssessor } from '../src'
import YoastSeoFaIr from './languages/fa_IR.json'
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
      url: '',
      description: '',
      titleWidth: 0,
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
          text: 'fa_IR',
          value: 'fa_IR'
        }
      ]
    }
  },
  watch: {
    locale (newVal) {
      if (newVal === 'fa_IR') {
        this.translations = YoastSeoFaIr
      } else {
        this.translations = null
      }
    }
  },
  methods: {
    assessorResultFilter (value) {
      return value
    }
  }
}
</script>

<style>
#app {
  background-color: #eee;
}
h1{
  padding: 10px;
  font-size: 2em;
}
.is-rtl .vue-yoast{
  direction: rtl;
  text-align: right;
}
</style>
