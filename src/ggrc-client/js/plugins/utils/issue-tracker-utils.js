/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

const issueTrackerStaticFields = {
  issue_tracker_enable_options: [
    {value: true, title: 'On'},
    {value: false, title: 'Off'},
  ],
  issue_tracker_priorities: ['P0', 'P1', 'P2', 'P3', 'P4'],
  issue_tracker_severities: ['S0', 'S1', 'S2', 'S3', 'S4'],
};

const isIssueTrackerEnabled = (instance) => {
  // 'issue_tracker' has already created if component_id is filled;
  return !!(instance.attr('issue_tracker.component_id'));
};

/**
 * Initializes issue tracker data from predefined defaults if tracker
 * data is not available from server ( new/old instance with empty issue_tracker )
 * @param  {Object} [instance={}] instance of type
 * @param  {Object} [defaultValues={}] issue tracker properties
 * @param  {Boolean} [canUseIssueTracker=false] should IssueTracker controls be shown
 */
function initIssueTrackerObject(
  instance = {},
  defaultValues = {},
  canUseIssueTracker = false
) {
  if (!isIssueTrackerEnabled(instance)) {
    instance.attr('issue_tracker', defaultValues);
  }
  instance.attr('can_use_issue_tracker', canUseIssueTracker);
}

function cleanUpWarnings(instance) {
  // clear warnings because CanJS save prev value of warning after merge
  // current instance and response
  if (instance.attr('issue_tracker._warnings')) {
    instance.attr('issue_tracker._warnings', []);
  }
}

export {
  issueTrackerStaticFields,
  isIssueTrackerEnabled,
  initIssueTrackerObject,
  cleanUpWarnings,
};
