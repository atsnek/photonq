import smtButtonComponent from './components/button';
import smtCalloutComponent from '../../../components/main-content/callout/styles/callout';
import smtCodeSnippetComponent from '../../../components/main-content/code-snippet/styles/codeSnippet';
import smtDrawerComponent from './components/drawer';
import smtFilesystemComponent from '../../../components/main-content/filesystem/styles/filesystem';
import smtHeadingComponent from './components/heading';
import smtIconCardComponent from '../../../components/main-content/icon-card/styles/iconCard';
import smtImageCardComponent from '../../../components/main-content/image-card/styles/imageCard';
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
import smtcodeResultPreviewComponent from '../../../components/main-content/code-result-preview/styles/codeResultPreview';
// import smtUserProfilePage from '../../../components/user/profile/styles/userProfile';
// import smtUserActivityComponent from '../../../components/user/activity/styles/userActivity';
import smtStepperComponent from './components/stepper';
// import smtPostPreviewComponent from '../../../components/post/preview/styles/postPreview';
// import smtPostsPage from '../../../components/post/styles/posts';
import smtInputComponent from './components/input';
// import smtPostReaderView from '../../../components/post/reader/styles/postReaderView';
import smtRatingFeature from './features/rating';
// import smtToastComponent from '../../../shared/components/toast/styles/toast';
// import smtActionToolbarComponent from '../../../shared/components/action-toolbar/styles/actionToolbar';
import smtTooltipComponent from './components/tooltip';
// import smtPostEditorComponent from '../../../components/post/editor/styles/postEditor';
import smtTextareaComponent from './components/textarea';
import smtImageComponent from './components/image';
import smtBadgeComponent from './components/badge';
// import smtSinglePostPage from '../../../components/post/styles/singlePost';
import smtSearchFeature from './features/search';
import smtPqFeaturesSection from '../photonq/semanticTokens/sections/features';
import smtPqPhotonQSection from '../photonq/semanticTokens/sections/photonQ';
import smtPqAboutUsSection from '../photonq/semanticTokens/sections/aboutUs';
import smtPageDirectoryComponent from '../components/pageDirectory';
// import smtUserAvatarComponent from '../../../components/user/avatar/styles/userAvatar';
import smtLinkComponent from './components/link';
import smtPqSectionTitle from '../photonq/semanticTokens/components/sectionTitle';

const themeSemanticTokens = {
  colors: {
    components: {
      separator: smtpSeparatorComponent,
      button: smtButtonComponent,
      link: smtLinkComponent,
      input: smtInputComponent,
      textarea: smtTextareaComponent,
      drawer: smtDrawerComponent,
      menu: smtMenuComponent,
      codeSnippet: smtCodeSnippetComponent,
      codeResultPreview: smtcodeResultPreviewComponent,
      filesystem: smtFilesystemComponent,
      heading: smtHeadingComponent,
      callout: smtCalloutComponent,
      imageCard: smtImageCardComponent,
      iconCard: smtIconCardComponent,
      pageDirectory: smtPageDirectoryComponent,
      // postPreview: smtPostPreviewComponent,
      // postEditor: smtPostEditorComponent,
      // userActivity: smtUserActivityComponent,
      stepper: smtStepperComponent,
      // toast: smtToastComponent,
      // actionToolbar: smtActionToolbarComponent,
      tooltip: smtTooltipComponent,
      image: smtImageComponent,
      badge: smtBadgeComponent
      // userAvatar: smtUserAvatarComponent,
    },
    blueGradient: {
      default:
        'linear-gradient(120deg, rgb(31, 162, 255), rgb(18, 216, 250), rgb(144, 238, 205)) 0% 0% / 300% 300%',
      _dark: 'linear-gradient(120deg, #5881fc, #2948ff) 0% 0% / 300% 300%'
    },
    modals: {
      // Add styles for modals here
    },
    pages: {
      // userProfile: smtUserProfilePage,
      // posts: smtPostsPage,
      // singlePost: smtSinglePostPage
    },
    views: {
      // postReader: smtPostReaderView
    },
    features: {
      rating: smtRatingFeature,
      search: smtSearchFeature
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
        sectionTitle: smtPqSectionTitle,
        featureCard: smtPqFeatureCard
      },
      sections: {
        features: smtPqFeaturesSection,
        photonq: smtPqPhotonQSection,
        aboutUs: smtPqAboutUsSection
      }
    }
  }
};

export default themeSemanticTokens;
