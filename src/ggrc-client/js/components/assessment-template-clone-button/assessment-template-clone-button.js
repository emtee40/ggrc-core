/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import template from './assessment-template-clone-button.mustache';
import router from '../../router';

export default can.Component.extend({
  tag: 'assessment-template-clone-button',
  template,
  viewModel: {
    model: null,
    text: null,
    parentId: null,
    parentType: null,
    objectType: null,
    openCloneModal(el) {
      let that = this;
      let $el = $(el);
      import(/*webpackChunkName: "mapper"*/ '../../controllers/mapper/mapper')
        .then(mapper => {
          mapper.AssessmentTemplateClone.launch($el, {
            object: that.attr('parentType'),
            type: that.attr('objectType'),
            join_object_id: that.attr('parentId'),
            refreshTreeView: that.refreshTreeView.bind(that),
          });
        });
    },
    refreshTreeView() {
      if (GGRC.page_instance().type === 'Audit') {
        if (router.attr('widget') === 'assessment_template') {
          this.dispatch('refreshTree');
        } else {
          router.attr({
            widget: 'assessment_template',
            refetch: true,
          });
        }
      }
    },
  },
});
