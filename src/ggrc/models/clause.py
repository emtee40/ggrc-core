# Copyright (C) 2018 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""Module for Clause model."""
from sqlalchemy import orm

from ggrc import db
from ggrc.access_control.roleable import Roleable
from ggrc.models.mixins import CustomAttributable, TestPlanned
from ggrc.models.comment import Commentable
from ggrc.models.deferred import deferred
from ggrc.models.mixins import LastDeprecatedTimeboxed
from ggrc.models.mixins import base
from ggrc.models.mixins import BusinessObject
from ggrc.models.object_document import PublicDocumentable
from ggrc.models.object_person import Personable
from ggrc.models.relationship import Relatable
from ggrc.models.track_object_state import HasObjectState
from ggrc.fulltext.mixin import Indexed
from ggrc.models import reflection


class Clause(Roleable, HasObjectState, CustomAttributable,
             Personable, LastDeprecatedTimeboxed, Relatable, Commentable,
             PublicDocumentable, TestPlanned, base.ContextRBAC,
             BusinessObject, Indexed, db.Model):

  __tablename__ = 'clauses'
  _table_plural = 'clauses'
  _aliases = {
      "description": "Text of Clause",
      "directive": None,
      "documents_file": None,
  }

  # pylint: disable=invalid-name
  na = deferred(db.Column(db.Boolean, default=False, nullable=False),
                'Clause')
  notes = deferred(db.Column(db.Text, nullable=False, default=u""), 'Clause')

  _api_attrs = reflection.ApiAttributes('na', 'notes')

  _fulltext_attrs = [
      'na',
      'notes',
  ]

  @classmethod
  def indexed_query(cls):
    query = super(Clause, cls).indexed_query()
    return query.options(
        orm.Load(cls).load_only(
            "na",
            "notes",
        )
    )

  _sanitize_html = ['notes']
  _include_links = []
