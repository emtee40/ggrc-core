/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import Join from './join';

export default Join('CMS.Models.Snapshot', {
  root_object: 'snapshot',
  root_collection: 'snapshots',
  attributes: {
    context: 'CMS.Models.Context.stub',
    modified_by: 'CMS.Models.Person.stub',
    parent: 'CMS.Models.Cacheable.stub',
  },
  join_keys: {
    parent: can.Model.Cacheable,
    revision: can.Model.Revision,
  },
  defaults: {
    parent: null,
    revision: null,
  },
  findAll: 'GET /api/snapshots',
  update: 'PUT /api/snapshots/{id}',
  child_instance: function (snapshotData) {
  },
  snapshot_instance: function (snapshotData) {
  },
}, {
  reinit: function () {
    let revision = CMS.Models.Revision.findInCacheById(this.revision_id);
    this.content = revision.content;
  },
  display_name: function () {
    if (!this.revision) {
      // temp solution till the bug GGRC-4839 is fixed
      console.error(
        `Revision is not defined for snapshot with ID: ${this.id}!`
      );
      return;
    }
    return this._super.call(this.revision.content);
  },
  display_type: function () {
    if (!this.revision) {
      // temp solution till the bug GGRC-4839 is fixed
      console.error(
        `Revision is not defined for snapshot with ID: ${this.id}!`
      );
      return;
    }
    return this._super.call(this.revision.content);
  },
});
