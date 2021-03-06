import {Platform, StyleSheet} from 'react-native';
import {
  UNIT,
  COLOR_FONT_ON_BLACK,
  COLOR_FONT_GRAY,
  COLOR_ICON_MEDIUM_GREY,
  COLOR_PINK_DARK
} from '../../components/variables/variables';
import {headerTitle, mainText, secondaryText} from '../../components/common-styles/typography';
import {elevation1} from '../../components/common-styles/shadow';
import {summary} from '../../components/issue-summary/issue-summary.styles';
import {link} from '../../components/common-styles/button';
import {separatorBorder} from '../../components/common-styles/list';

const centered = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
};

export default StyleSheet.create({
  secondaryText: secondaryText,
  container: {
    flex: 1
  },
  issueContent: {
    backgroundColor: COLOR_FONT_ON_BLACK,
  },
  headerText: {
    ...headerTitle,
    fontWeight: '500',
    ...Platform.select({
      ios: {
        marginLeft: UNIT / 2,
      },
      android: {
        marginLeft: UNIT * 1.3,
      }
    })
  },
  headerTextResolved: {
    color: COLOR_ICON_MEDIUM_GREY,
    textDecorationLine: 'line-through'
  },
  issueStar: {
    marginLeft: UNIT * 2,
    marginRight: UNIT * 2
  },
  savingIndicator: {
    paddingTop: 4,
    width: 30,
    height: 20
  },
  issueView: {
    marginTop: UNIT,
    padding: UNIT * 2
  },
  issueTopPanel: {
    paddingTop: UNIT / 4,
    marginBottom: UNIT * 2
  },
  issueTopPanelText: {
    ...secondaryText
  },
  tags: {
    marginTop: UNIT * 2
  },
  tagsSeparator: {
    height: UNIT,
    marginRight: -UNIT * 2,
    ...separatorBorder
  },
  topPanelUpdatedInformation: {
    marginTop: UNIT * 0.75,
  },
  summary: {
    paddingTop: UNIT,
    ...summary
  },
  description: {
    marginTop: UNIT * 2,
  },
  attachments: {
    marginTop: UNIT * 2,
  },
  loadingActivityError: {
    marginTop: UNIT * 2,
    color: COLOR_PINK_DARK,
    textAlign: 'center'
  },
  disabledSaveButton: {
    color: COLOR_FONT_GRAY
  },

  row: {
    flexDirection: 'row',
    flex: 1
  },
  alignedRight: {
    marginRight: UNIT
  },

  tabsBar: {
    ...elevation1,
    backgroundColor: COLOR_FONT_ON_BLACK
  },
  tabLabel: {
    ...mainText,
    paddingTop: UNIT,
    paddingBottom: UNIT,
    fontWeight: '500',
    textTransform: 'none',

    ...Platform.select({
      ios: {},
      android: {
        fontSize: 18,
        fontWeight: '400',
      }
    })
  },
  tabLabelActive: {
    fontWeight: '400',
  },
  tabLazyPlaceholder: {
    ...centered
  },
  issueAdditionalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  issueAdditionalInfo: {
    flex: 1
  },
  switchToActivityButton: {
    marginTop: UNIT * 4,
    ...centered,
  },
  switchToActivityButtonText: {
    ...mainText,
    ...link,
    padding: UNIT,
    marginBottom: UNIT * 3
  },
  visibility: {
    marginBottom: UNIT
  }
});
