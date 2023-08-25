import smtButtonComponent from './components/button';
import smtCalloutComponent from '../../../features/main-content/callout/styles/callout';
import smtCodeSnippetComponent from '../../../features/main-content/code-snippet/styles/codeSnippet';
import smtDrawerComponent from './components/drawer';
import smtFilesystemComponent from '../../../features/main-content/filesystem/styles/filesystem';
import smtHeadingComponent from './components/heading';
import smtIconCardComponent from '../../../features/main-content/icon-card/styles/iconCard';
import smtImageCardComponent from '../../../features/main-content/image-card/styles/imageCard';
import smtMenuComponent from './components/menu';
import smtpSeparatorComponent from './components/separator';
import smtFooter from './layout/footer';
import smtLeftNav from './layout/leftNav';
import smtMain from './layout/main';
import smtRightNav from './layout/rightNav';
import smtTopNav from './layout/topNav';
import smtPqTopNav from '../photonq/semanticTokens/layout/topNav';
import smtPqShared from '../photonq/semanticTokens/shared';
import smtShared from './shared';
import smtPqSectionLabel from '../photonq/semanticTokens/components/sectionLabel';
import smtPqFeatureCard from '../photonq/semanticTokens/components/featureCard';
import smtcodeResultPreviewComponent from '../../../features/main-content/code-result-preview/styles/codeResultPreview';
import smtUserProfilePage from '../../../features/user/profile/styles/userProfile';
import smtUserActivityComponent from '../../../features/user/activity/styles/userActivity';
import smtStepperComponent from './components/stepper';
import smtPostPreviewComponent from '../../../features/post/preview/styles/postPreview';
import smtPostsPage from '../../../features/post/styles/posts';
import smtInputComponent from './components/input';
import smtPostReaderView from '../../../features/post/reader/styles/postReaderView';
import smtRatingFeature from './features/rating';
import smtToastComponent from '../../../shared/components/toast/styles/toast';
import smtActionToolbarComponent from '../../../shared/components/action-toolbar/styles/actionToolbar';
import smtTooltipComponent from './components/tooltip';
import smtPostEditorComponent from '../../../features/post/editor/styles/postEditor';
import smtTextareaComponent from './components/textarea';
import smtImageComponent from './components/image';

const themeSemanticTokens = {
  colors: {
    components: {
      separator: smtpSeparatorComponent,
      button: smtButtonComponent,
      drawer: smtDrawerComponent,
      menu: smtMenuComponent,
      codeSnippet: smtCodeSnippetComponent,
      codeResultPreview: smtcodeResultPreviewComponent,
      filesystem: smtFilesystemComponent,
      heading: smtHeadingComponent,
      callout: smtCalloutComponent,
      imageCard: smtImageCardComponent,
      iconCard: smtIconCardComponent,
      postPreview: smtPostPreviewComponent,
      postEditor: smtPostEditorComponent,
      userActivity: smtUserActivityComponent,
      stepper: smtStepperComponent,
      input: smtInputComponent,
      textarea: smtTextareaComponent,
      toast: smtToastComponent,
      actionToolbar: smtActionToolbarComponent,
      tooltip: smtTooltipComponent,
      image: smtImageComponent,
    },
    modals: {
      // Add styles for modals here
    },
    pages: {
      userProfile: smtUserProfilePage,
      posts: smtPostsPage
    },
    views: {
      postReader: smtPostReaderView,
    },
    features: {
      rating: smtRatingFeature,
    },
    shared: smtShared,
    topNav: smtTopNav,
    leftNav: smtLeftNav,
    main: smtMain,
    rightNav: smtRightNav,
    footer: smtFooter,

    /**
     * PHOTONQ SECTION
     */
    pq: {
      shared: smtPqShared,
      layout: {
        topNav: smtPqTopNav
      },
      components: {
        sectionLabel: smtPqSectionLabel,
        featureCard: smtPqFeatureCard
      }
    }
  }
};

export default themeSemanticTokens;
