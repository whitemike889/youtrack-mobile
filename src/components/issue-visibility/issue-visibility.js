/* @flow */

import type {Visibility} from '../../flow/Visibility';
import ResourceTypes from '../api/api__resource-types';
import {getEntityPresentation} from '../issue-formatter/issue-formatter';

export default class IssueVisibility {

  static visibility(visibility: Visibility, isLimited: ?boolean) {
    return Object.assign(
      {
        permittedUsers: [],
        permittedGroups: []
      },
      visibility,
      {
        $type: isLimited ? ResourceTypes.VISIBILITY_LIMITED : ResourceTypes.VISIBILITY_UNLIMITED,
      },
    );
  }

  static hasUsersOrGroups(visibility: Visibility): boolean {
    if (!visibility) {
      return false;
    }

    const _visibility = this.visibility(visibility);
    return !!(
      (_visibility.permittedUsers && _visibility.permittedUsers.length) ||
      (_visibility.permittedGroups && _visibility.permittedGroups.length)
    );
  }

  static isSecured(visibility: Visibility): boolean {
    if (!visibility) {
      return false;
    }
    return this.hasUsersOrGroups(visibility);
  }

  static toggleOption(visibility: Visibility, option: Object): Object {
    const _visibility = this.visibility(visibility);
    const visibilityTypes = [
      {type: ResourceTypes.USER, key: 'permittedUsers'},
      {type: ResourceTypes.USER_GROUP, key: 'permittedGroups'}
    ];

    for (const it of visibilityTypes) {
      if (option.$type === it.type) {
        if (hasOption(_visibility[it.key], option.id)) {
          _visibility[it.key] = _visibility[it.key].filter((user) => user.id !== option.id);
        } else {
          _visibility[it.key].push(option);
        }
        break;
      }
    }
    return this.visibility(
      _visibility,
      this.hasUsersOrGroups(_visibility)
    );

    function hasOption(collection: Array<Object>, optionId: string) {
      return collection.some((user) => user.id === optionId);
    }
  }

  static getVisibilityPresentation(visibility: Visibility = {}) {
    return [...(visibility.permittedGroups || []), ...(visibility.permittedUsers || [])]
      .map(it => getEntityPresentation(it))
      .join(', ');
  }

}
