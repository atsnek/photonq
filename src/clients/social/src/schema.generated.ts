
import { proxy, arrayProxy, fnProxy, fnArrayProxy, t } from "snek-query";

export enum Language {
    EN = "EN",
    DE = "DE"
}
export enum USER_STATE_UNSPECIFIED_USER_STATE_ACTIVE_USER_STATE_INACTIVE_USER_STATE_DELETED_USER_STATE_LOCKED_USER_STATE_SUSPEND_USER_STATE_INITIAL {
    USER_STATE_UNSPECIFIED = "USER_STATE_UNSPECIFIED",
    USER_STATE_ACTIVE = "USER_STATE_ACTIVE",
    USER_STATE_INACTIVE = "USER_STATE_INACTIVE",
    USER_STATE_DELETED = "USER_STATE_DELETED",
    USER_STATE_LOCKED = "USER_STATE_LOCKED",
    USER_STATE_SUSPEND = "USER_STATE_SUSPEND",
    USER_STATE_INITIAL = "USER_STATE_INITIAL"
}
export enum Privacy {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    FRIENDS = "FRIENDS"
}
export enum ActivityType {
    USER_CREATED = "USER_CREATED",
    POST_CREATED = "POST_CREATED",
    FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    STAR = "STAR",
    UNSTAR = "UNSTAR"
}
export enum PrivacyInput {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    FRIENDS = "FRIENDS"
}
export enum LanguageInput {
    EN = "EN",
    DE = "DE"
}
export enum ActivityTypeInput {
    USER_CREATED = "USER_CREATED",
    POST_CREATED = "POST_CREATED",
    FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    STAR = "STAR",
    UNSTAR = "UNSTAR"
}
export enum SortOrderInput {
    asc = "asc",
    desc = "desc"
}
export enum UserOrderByRelevanceFieldEnumInput {
    id = "id",
    organizationId = "organizationId",
    bio = "bio"
}
export enum PostOrderByRelevanceFieldEnumInput {
    id = "id",
    content = "content",
    summary = "summary",
    title = "title",
    userId = "userId",
    slug = "slug",
    avatarURL = "avatarURL"
}
export enum StarOrderByRelevanceFieldEnumInput {
    id = "id",
    postId = "postId",
    userId = "userId"
}
export enum ActivityOrderByRelevanceFieldEnumInput {
    id = "id",
    postId = "postId",
    userId = "userId",
    relatedUserId = "relatedUserId"
}
export enum PostViewOrderByRelevanceFieldEnumInput {
    postId = "postId",
    viewedById = "viewedById"
}
export enum FollowOrderByRelevanceFieldEnumInput {
    id = "id",
    followerId = "followerId",
    followedId = "followedId"
}
export enum UserViewOrderByRelevanceFieldEnumInput {
    userId = "userId",
    viewedById = "viewedById"
}

export type UserWhereInputInput = {
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    organization?: WithoutInput_14AndOrganizationWhereInputInput;
    posts?: PostListRelationFilterInput;
    followers?: FollowListRelationFilterInput;
    followings?: FollowListRelationFilterInput;
    starredPosts?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    relatedActivities?: ActivityListRelationFilterInput;
    receivedUserViews?: UserViewListRelationFilterInput;
    performedUserViews?: UserViewListRelationFilterInput;
    performedPostViews?: PostViewListRelationFilterInput;
};
export type WithoutInput_14AndOrganizationWhereInputInput = {
    is?: OrganizationWhereInputInput;
    isNot?: OrganizationWhereInputInput;
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    id?: t.String;
    users?: UserListRelationFilterInput;
};
export type OrganizationWhereInputInput = {
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    id?: t.String;
    users?: UserListRelationFilterInput;
};
export type UserListRelationFilterInput = {
    every?: UserWhereInputInput;
    some?: UserWhereInputInput;
    none?: UserWhereInputInput;
};
export type PostListRelationFilterInput = {
    every?: PostWhereInputInput;
    some?: PostWhereInputInput;
    none?: PostWhereInputInput;
};
export type PostWhereInputInput = {
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: EnumPrivacyFilterInput;
    language?: EnumLanguageFilterInput_1;
    user?: WithoutInput_16AndUserWhereInputInput;
    stars?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    views?: PostViewListRelationFilterInput;
};
export type EnumPrivacyFilterInput = {
    equals?: t.String;
    in?: PrivacyInput[];
    notIn?: PrivacyInput[];
    not?: t.String;
};
export type EnumLanguageFilterInput_1 = {
    equals?: t.String;
    in?: LanguageInput[];
    notIn?: LanguageInput[];
    not?: t.String;
};
export type WithoutInput_16AndUserWhereInputInput = {
    is?: UserWhereInputInput;
    isNot?: UserWhereInputInput;
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    organization?: WithoutInput_14AndOrganizationWhereInputInput;
    posts?: PostListRelationFilterInput;
    followers?: FollowListRelationFilterInput;
    followings?: FollowListRelationFilterInput;
    starredPosts?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    relatedActivities?: ActivityListRelationFilterInput;
    receivedUserViews?: UserViewListRelationFilterInput;
    performedUserViews?: UserViewListRelationFilterInput;
    performedPostViews?: PostViewListRelationFilterInput;
};
export type FollowListRelationFilterInput = {
    every?: FollowWhereInputInput;
    some?: FollowWhereInputInput;
    none?: FollowWhereInputInput;
};
export type FollowWhereInputInput = {
    AND?: FollowWhereInputInput[];
    OR?: FollowWhereInputInput[];
    NOT?: FollowWhereInputInput[];
    id?: t.String;
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
    follower?: WithoutInput_16AndUserWhereInputInput;
    followed?: WithoutInput_16AndUserWhereInputInput;
};
export type StarListRelationFilterInput = {
    every?: StarWhereInputInput;
    some?: StarWhereInputInput;
    none?: StarWhereInputInput;
};
export type StarWhereInputInput = {
    AND?: StarWhereInputInput[];
    OR?: StarWhereInputInput[];
    NOT?: StarWhereInputInput[];
    id?: t.String;
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
};
export type WithoutInput_18AndPostWhereInputInput = {
    is?: PostWhereInputInput;
    isNot?: PostWhereInputInput;
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: EnumPrivacyFilterInput;
    language?: EnumLanguageFilterInput_1;
    user?: WithoutInput_16AndUserWhereInputInput;
    stars?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    views?: PostViewListRelationFilterInput;
};
export type ActivityListRelationFilterInput = {
    every?: ActivityWhereInputInput;
    some?: ActivityWhereInputInput;
    none?: ActivityWhereInputInput;
};
export type ActivityWhereInputInput = {
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    id?: t.String;
    type?: EnumActivityTypeFilterInput;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    relatedUserId?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    relatedUser?: WithoutInput_20AndUserWhereInputInput;
};
export type EnumActivityTypeFilterInput = {
    equals?: t.String;
    in?: ActivityTypeInput[];
    notIn?: ActivityTypeInput[];
    not?: t.String;
};
export type WithoutInput_20AndUserWhereInputInput = {
    is?: UserWhereInputInput;
    isNot?: UserWhereInputInput;
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    organization?: WithoutInput_14AndOrganizationWhereInputInput;
    posts?: PostListRelationFilterInput;
    followers?: FollowListRelationFilterInput;
    followings?: FollowListRelationFilterInput;
    starredPosts?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    relatedActivities?: ActivityListRelationFilterInput;
    receivedUserViews?: UserViewListRelationFilterInput;
    performedUserViews?: UserViewListRelationFilterInput;
    performedPostViews?: PostViewListRelationFilterInput;
};
export type UserViewListRelationFilterInput = {
    every?: UserViewWhereInputInput;
    some?: UserViewWhereInputInput;
    none?: UserViewWhereInputInput;
};
export type UserViewWhereInputInput = {
    AND?: UserViewWhereInputInput[];
    OR?: UserViewWhereInputInput[];
    NOT?: UserViewWhereInputInput[];
    id?: t.Number;
    userId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
};
export type PostViewListRelationFilterInput = {
    every?: PostViewWhereInputInput;
    some?: PostViewWhereInputInput;
    none?: PostViewWhereInputInput;
};
export type PostViewWhereInputInput = {
    AND?: PostViewWhereInputInput[];
    OR?: PostViewWhereInputInput[];
    NOT?: PostViewWhereInputInput[];
    id?: t.Number;
    postId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
    post?: WithoutInput_22AndPostWhereInputInput;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
};
export type WithoutInput_22AndPostWhereInputInput = {
    is?: PostWhereInputInput;
    isNot?: PostWhereInputInput;
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: EnumPrivacyFilterInput;
    language?: EnumLanguageFilterInput_1;
    user?: WithoutInput_16AndUserWhereInputInput;
    stars?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    views?: PostViewListRelationFilterInput;
};
export type UserOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    organizationId?: SortOrderInput;
    bio?: t.String;
    createdAt?: SortOrderInput;
    updatedAt?: SortOrderInput;
    language?: SortOrderInput;
    organization?: OrganizationOrderByWithRelationAndSearchRelevanceInputInput;
    posts?: PostOrderByRelationAggregateInputInput;
    followers?: FollowOrderByRelationAggregateInputInput;
    followings?: FollowOrderByRelationAggregateInputInput;
    starredPosts?: StarOrderByRelationAggregateInputInput;
    activities?: ActivityOrderByRelationAggregateInputInput;
    relatedActivities?: ActivityOrderByRelationAggregateInputInput;
    receivedUserViews?: UserViewOrderByRelationAggregateInputInput;
    performedUserViews?: UserViewOrderByRelationAggregateInputInput;
    performedPostViews?: PostViewOrderByRelationAggregateInputInput;
    _relevance?: UserOrderByRelevanceInputInput;
};
export type OrganizationOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    users?: UserOrderByRelationAggregateInputInput;
    _relevance?: OrganizationOrderByRelevanceInputInput;
};
export type UserOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type OrganizationOrderByRelevanceInputInput = {
    fields?: t.String[];
    sort: SortOrderInput;
    search: t.String;
};
export type PostOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type FollowOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type StarOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type ActivityOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type UserViewOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type PostViewOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type UserOrderByRelevanceInputInput = {
    fields: t.String;
    sort: SortOrderInput;
    search: t.String;
};
export type OmitInput_20 = {
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type OrganizationCreateNestedOneWithoutUsersInputInput = {
    create?: ObjectAndOrganizationUncheckedCreateWithoutUsersInputInput;
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInputInput;
    connect?: WhereInput_3AndWhereInput_4;
};
export type ObjectAndOrganizationUncheckedCreateWithoutUsersInputInput = {
    id: t.String;
};
export type OrganizationCreateOrConnectWithoutUsersInputInput = {
    where: WhereInput_3AndWhereInput_4;
    create: ObjectAndOrganizationUncheckedCreateWithoutUsersInputInput;
};
export type WhereInput_3AndWhereInput_4 = {
    id?: t.String;
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    users?: UserListRelationFilterInput;
};
export type PostUncheckedCreateNestedManyWithoutUserInputInput = {
    create?: ObjectAndPostUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutUserInputInput[];
    createMany?: PostCreateManyUserInputEnvelopeInput;
    connect?: WhereInput_8AndWhereInput_7;
};
export type ObjectAndPostUncheckedCreateWithoutUserInputInput = {
    id?: t.String;
    slug: t.String;
    title: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: PrivacyInput;
    language?: LanguageInput;
    stars?: StarUncheckedCreateNestedManyWithoutPostInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutPostInputInput;
    views?: PostViewUncheckedCreateNestedManyWithoutPostInputInput;
};
export type StarUncheckedCreateNestedManyWithoutPostInputInput = {
    create?: WithoutInput_24AndStarUncheckedCreateWithoutPostInputInput;
    connectOrCreate?: StarCreateOrConnectWithoutPostInputInput[];
    createMany?: StarCreateManyPostInputEnvelopeInput;
    connect?: WhereInput_16AndWhereInput_15;
};
export type WithoutInput_24AndStarUncheckedCreateWithoutPostInputInput = {
    user?: UserCreateNestedOneWithoutStarredPostsInputInput;
    id?: t.String;
    userId?: t.String;
    createdAt?: t.String;
};
export type UserCreateNestedOneWithoutStarredPostsInputInput = {
    create?: WithoutInput_26AndUserUncheckedCreateWithoutStarredPostsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutStarredPostsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_26AndUserUncheckedCreateWithoutStarredPostsInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type FollowUncheckedCreateNestedManyWithoutFollowedInputInput = {
    create?: WithoutInput_28AndFollowUncheckedCreateWithoutFollowedInputInput;
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedInputInput[];
    createMany?: FollowCreateManyFollowedInputEnvelopeInput;
    connect?: WhereInput_12AndWhereInput_11;
};
export type WithoutInput_28AndFollowUncheckedCreateWithoutFollowedInputInput = {
    follower?: UserCreateNestedOneWithoutFollowingsInputInput;
    id?: t.String;
    followerId?: t.String;
    createdAt?: t.String;
};
export type UserCreateNestedOneWithoutFollowingsInputInput = {
    create?: WithoutInput_30AndUserUncheckedCreateWithoutFollowingsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutFollowingsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_30AndUserUncheckedCreateWithoutFollowingsInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type StarUncheckedCreateNestedManyWithoutUserInputInput = {
    create?: WithoutInput_32AndStarUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: StarCreateOrConnectWithoutUserInputInput[];
    createMany?: StarCreateManyUserInputEnvelopeInput;
    connect?: WhereInput_16AndWhereInput_15;
};
export type WithoutInput_32AndStarUncheckedCreateWithoutUserInputInput = {
    post?: PostCreateNestedOneWithoutStarsInputInput;
    id?: t.String;
    postId?: t.String;
    createdAt?: t.String;
};
export type PostCreateNestedOneWithoutStarsInputInput = {
    create?: WithoutInput_34AndPostUncheckedCreateWithoutStarsInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutStarsInputInput;
    connect?: WhereInput_6AndWhereInput_7;
};
export type WithoutInput_34AndPostUncheckedCreateWithoutStarsInputInput = {
    user?: UserCreateNestedOneWithoutPostsInputInput;
    id?: t.String;
    slug: t.String;
    title: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: PrivacyInput;
    language?: LanguageInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutPostInputInput;
    views?: PostViewUncheckedCreateNestedManyWithoutPostInputInput;
};
export type UserCreateNestedOneWithoutPostsInputInput = {
    create?: WithoutInput_36AndUserUncheckedCreateWithoutPostsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPostsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_36AndUserUncheckedCreateWithoutPostsInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type FollowUncheckedCreateNestedManyWithoutFollowerInputInput = {
    create?: WithoutInput_38AndFollowUncheckedCreateWithoutFollowerInputInput;
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInputInput[];
    createMany?: FollowCreateManyFollowerInputEnvelopeInput;
    connect?: WhereInput_12AndWhereInput_11;
};
export type WithoutInput_38AndFollowUncheckedCreateWithoutFollowerInputInput = {
    followed?: UserCreateNestedOneWithoutFollowersInputInput;
    id?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
};
export type UserCreateNestedOneWithoutFollowersInputInput = {
    create?: WithoutInput_40AndUserUncheckedCreateWithoutFollowersInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_40AndUserUncheckedCreateWithoutFollowersInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type ActivityUncheckedCreateNestedManyWithoutUserInputInput = {
    create?: WithoutInput_42AndActivityUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInputInput[];
    createMany?: ActivityCreateManyUserInputEnvelopeInput;
    connect?: WhereInput_20AndWhereInput_19;
};
export type WithoutInput_42AndActivityUncheckedCreateWithoutUserInputInput = {
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    relatedUser?: UserCreateNestedOneWithoutRelatedActivitiesInputInput;
    id?: t.String;
    type: ActivityTypeInput;
    createdAt?: t.String;
    postId?: t.String;
    relatedUserId?: t.String;
};
export type PostCreateNestedOneWithoutActivitiesInputInput = {
    create?: WithoutInput_44AndPostUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutActivitiesInputInput;
    connect?: WhereInput_6AndWhereInput_7;
};
export type WithoutInput_44AndPostUncheckedCreateWithoutActivitiesInputInput = {
    user?: UserCreateNestedOneWithoutPostsInputInput;
    id?: t.String;
    slug: t.String;
    title: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: PrivacyInput;
    language?: LanguageInput;
    stars?: StarUncheckedCreateNestedManyWithoutPostInputInput;
    views?: PostViewUncheckedCreateNestedManyWithoutPostInputInput;
};
export type PostViewUncheckedCreateNestedManyWithoutPostInputInput = {
    create?: WithoutInput_46AndPostViewUncheckedCreateWithoutPostInputInput;
    connectOrCreate?: PostViewCreateOrConnectWithoutPostInputInput[];
    createMany?: PostViewCreateManyPostInputEnvelopeInput;
    connect?: WhereInput_26AndWhereInput_25;
};
export type WithoutInput_46AndPostViewUncheckedCreateWithoutPostInputInput = {
    viewedBy?: UserCreateNestedOneWithoutPerformedPostViewsInputInput;
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type UserCreateNestedOneWithoutPerformedPostViewsInputInput = {
    create?: WithoutInput_48AndUserUncheckedCreateWithoutPerformedPostViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPerformedPostViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_48AndUserUncheckedCreateWithoutPerformedPostViewsInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
};
export type ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput = {
    create?: WithoutInput_50AndActivityUncheckedCreateWithoutRelatedUserInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutRelatedUserInputInput[];
    createMany?: ActivityCreateManyRelatedUserInputEnvelopeInput;
    connect?: WhereInput_20AndWhereInput_19;
};
export type WithoutInput_50AndActivityUncheckedCreateWithoutRelatedUserInputInput = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    type: ActivityTypeInput;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
};
export type UserCreateNestedOneWithoutActivitiesInputInput = {
    create?: WithoutInput_52AndUserUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_52AndUserUncheckedCreateWithoutActivitiesInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type UserViewUncheckedCreateNestedManyWithoutViewedByInputInput = {
    create?: WithoutInput_54AndUserViewUncheckedCreateWithoutViewedByInputInput;
    connectOrCreate?: UserViewCreateOrConnectWithoutViewedByInputInput[];
    createMany?: UserViewCreateManyViewedByInputEnvelopeInput;
    connect?: WhereInput_23AndWhereInput_22;
};
export type WithoutInput_54AndUserViewUncheckedCreateWithoutViewedByInputInput = {
    user?: UserCreateNestedOneWithoutPerformedUserViewsInputInput;
    id?: t.Number;
    userId?: t.String;
    createdAt?: t.String;
};
export type UserCreateNestedOneWithoutPerformedUserViewsInputInput = {
    create?: WithoutInput_56AndUserUncheckedCreateWithoutPerformedUserViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPerformedUserViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_56AndUserUncheckedCreateWithoutPerformedUserViewsInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type PostViewUncheckedCreateNestedManyWithoutViewedByInputInput = {
    create?: WithoutInput_58AndPostViewUncheckedCreateWithoutViewedByInputInput;
    connectOrCreate?: PostViewCreateOrConnectWithoutViewedByInputInput[];
    createMany?: PostViewCreateManyViewedByInputEnvelopeInput;
    connect?: WhereInput_26AndWhereInput_25;
};
export type WithoutInput_58AndPostViewUncheckedCreateWithoutViewedByInputInput = {
    post?: PostCreateNestedOneWithoutViewsInputInput;
    id?: t.Number;
    postId?: t.String;
    createdAt?: t.String;
};
export type PostCreateNestedOneWithoutViewsInputInput = {
    create?: WithoutInput_60AndPostUncheckedCreateWithoutViewsInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutViewsInputInput;
    connect?: WhereInput_6AndWhereInput_7;
};
export type WithoutInput_60AndPostUncheckedCreateWithoutViewsInputInput = {
    user?: UserCreateNestedOneWithoutPostsInputInput;
    id?: t.String;
    slug: t.String;
    title: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: PrivacyInput;
    language?: LanguageInput;
    stars?: StarUncheckedCreateNestedManyWithoutPostInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutPostInputInput;
};
export type ActivityUncheckedCreateNestedManyWithoutPostInputInput = {
    create?: WithoutInput_62AndActivityUncheckedCreateWithoutPostInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutPostInputInput[];
    createMany?: ActivityCreateManyPostInputEnvelopeInput;
    connect?: WhereInput_20AndWhereInput_19;
};
export type WithoutInput_62AndActivityUncheckedCreateWithoutPostInputInput = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    relatedUser?: UserCreateNestedOneWithoutRelatedActivitiesInputInput;
    id?: t.String;
    type: ActivityTypeInput;
    createdAt?: t.String;
    userId?: t.String;
    relatedUserId?: t.String;
};
export type UserCreateNestedOneWithoutRelatedActivitiesInputInput = {
    create?: WithoutInput_64AndUserUncheckedCreateWithoutRelatedActivitiesInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutRelatedActivitiesInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_64AndUserUncheckedCreateWithoutRelatedActivitiesInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type UserViewUncheckedCreateNestedManyWithoutUserInputInput = {
    create?: WithoutInput_66AndUserViewUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: UserViewCreateOrConnectWithoutUserInputInput[];
    createMany?: UserViewCreateManyUserInputEnvelopeInput;
    connect?: WhereInput_23AndWhereInput_22;
};
export type WithoutInput_66AndUserViewUncheckedCreateWithoutUserInputInput = {
    viewedBy?: UserCreateNestedOneWithoutReceivedUserViewsInputInput;
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type UserCreateNestedOneWithoutReceivedUserViewsInputInput = {
    create?: WithoutInput_68AndUserUncheckedCreateWithoutReceivedUserViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutReceivedUserViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_68AndUserUncheckedCreateWithoutReceivedUserViewsInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type UserCreateOrConnectWithoutReceivedUserViewsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_68AndUserUncheckedCreateWithoutReceivedUserViewsInputInput;
};
export type WhereInput_27AndWhereInput_28 = {
    id?: t.String;
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    organization?: WithoutInput_14AndOrganizationWhereInputInput;
    posts?: PostListRelationFilterInput;
    followers?: FollowListRelationFilterInput;
    followings?: FollowListRelationFilterInput;
    starredPosts?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    relatedActivities?: ActivityListRelationFilterInput;
    receivedUserViews?: UserViewListRelationFilterInput;
    performedUserViews?: UserViewListRelationFilterInput;
    performedPostViews?: PostViewListRelationFilterInput;
};
export type UserViewCreateOrConnectWithoutUserInputInput = {
    where: WhereInput_21AndWhereInput_22;
    create: WithoutInput_66AndUserViewUncheckedCreateWithoutUserInputInput;
};
export type WhereInput_21AndWhereInput_22 = {
    id?: t.Number;
    AND?: UserViewWhereInputInput[];
    OR?: UserViewWhereInputInput[];
    NOT?: UserViewWhereInputInput[];
    userId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
};
export type UserViewCreateManyUserInputEnvelopeInput = {
    data?: UserViewCreateManyUserInputInput[];
    skipDuplicates?: t.Boolean;
};
export type UserViewCreateManyUserInputInput = {
    id?: t.Number;
    viewedById: t.String;
    createdAt?: t.String;
};
export type WhereInput_23AndWhereInput_22 = {
    id?: t.Number;
    AND?: UserViewWhereInputInput[];
    OR?: UserViewWhereInputInput[];
    NOT?: UserViewWhereInputInput[];
    userId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
};
export type UserCreateOrConnectWithoutRelatedActivitiesInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_64AndUserUncheckedCreateWithoutRelatedActivitiesInputInput;
};
export type ActivityCreateOrConnectWithoutPostInputInput = {
    where: WhereInput_18AndWhereInput_19;
    create: WithoutInput_62AndActivityUncheckedCreateWithoutPostInputInput;
};
export type WhereInput_18AndWhereInput_19 = {
    id?: t.String;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    type?: EnumActivityTypeFilterInput;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    relatedUserId?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    relatedUser?: WithoutInput_20AndUserWhereInputInput;
};
export type ActivityCreateManyPostInputEnvelopeInput = {
    data?: ActivityCreateManyPostInputInput[];
    skipDuplicates?: t.Boolean;
};
export type ActivityCreateManyPostInputInput = {
    id?: t.String;
    type: ActivityTypeInput;
    createdAt?: t.String;
    userId: t.String;
    relatedUserId?: t.String;
};
export type WhereInput_20AndWhereInput_19 = {
    id?: t.String;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    type?: EnumActivityTypeFilterInput;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    relatedUserId?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    relatedUser?: WithoutInput_20AndUserWhereInputInput;
};
export type PostCreateOrConnectWithoutViewsInputInput = {
    where: WhereInput_6AndWhereInput_7;
    create: WithoutInput_60AndPostUncheckedCreateWithoutViewsInputInput;
};
export type WhereInput_6AndWhereInput_7 = {
    id?: t.String;
    slug?: t.String;
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: EnumPrivacyFilterInput;
    language?: EnumLanguageFilterInput_1;
    user?: WithoutInput_16AndUserWhereInputInput;
    stars?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    views?: PostViewListRelationFilterInput;
};
export type PostViewCreateOrConnectWithoutViewedByInputInput = {
    where: WhereInput_24AndWhereInput_25;
    create: WithoutInput_58AndPostViewUncheckedCreateWithoutViewedByInputInput;
};
export type WhereInput_24AndWhereInput_25 = {
    id?: t.Number;
    AND?: PostViewWhereInputInput[];
    OR?: PostViewWhereInputInput[];
    NOT?: PostViewWhereInputInput[];
    postId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
    post?: WithoutInput_22AndPostWhereInputInput;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
};
export type PostViewCreateManyViewedByInputEnvelopeInput = {
    data?: PostViewCreateManyViewedByInputInput[];
    skipDuplicates?: t.Boolean;
};
export type PostViewCreateManyViewedByInputInput = {
    id?: t.Number;
    postId: t.String;
    createdAt?: t.String;
};
export type WhereInput_26AndWhereInput_25 = {
    id?: t.Number;
    AND?: PostViewWhereInputInput[];
    OR?: PostViewWhereInputInput[];
    NOT?: PostViewWhereInputInput[];
    postId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
    post?: WithoutInput_22AndPostWhereInputInput;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
};
export type UserCreateOrConnectWithoutPerformedUserViewsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_56AndUserUncheckedCreateWithoutPerformedUserViewsInputInput;
};
export type UserViewCreateOrConnectWithoutViewedByInputInput = {
    where: WhereInput_21AndWhereInput_22;
    create: WithoutInput_54AndUserViewUncheckedCreateWithoutViewedByInputInput;
};
export type UserViewCreateManyViewedByInputEnvelopeInput = {
    data?: UserViewCreateManyViewedByInputInput[];
    skipDuplicates?: t.Boolean;
};
export type UserViewCreateManyViewedByInputInput = {
    id?: t.Number;
    userId: t.String;
    createdAt?: t.String;
};
export type UserCreateOrConnectWithoutActivitiesInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_52AndUserUncheckedCreateWithoutActivitiesInputInput;
};
export type ActivityCreateOrConnectWithoutRelatedUserInputInput = {
    where: WhereInput_18AndWhereInput_19;
    create: WithoutInput_50AndActivityUncheckedCreateWithoutRelatedUserInputInput;
};
export type ActivityCreateManyRelatedUserInputEnvelopeInput = {
    data?: ActivityCreateManyRelatedUserInputInput[];
    skipDuplicates?: t.Boolean;
};
export type ActivityCreateManyRelatedUserInputInput = {
    id?: t.String;
    type: ActivityTypeInput;
    createdAt?: t.String;
    userId: t.String;
    postId?: t.String;
};
export type UserCreateOrConnectWithoutPerformedPostViewsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_48AndUserUncheckedCreateWithoutPerformedPostViewsInputInput;
};
export type PostViewCreateOrConnectWithoutPostInputInput = {
    where: WhereInput_24AndWhereInput_25;
    create: WithoutInput_46AndPostViewUncheckedCreateWithoutPostInputInput;
};
export type PostViewCreateManyPostInputEnvelopeInput = {
    data?: PostViewCreateManyPostInputInput[];
    skipDuplicates?: t.Boolean;
};
export type PostViewCreateManyPostInputInput = {
    id?: t.Number;
    viewedById: t.String;
    createdAt?: t.String;
};
export type PostCreateOrConnectWithoutActivitiesInputInput = {
    where: WhereInput_6AndWhereInput_7;
    create: WithoutInput_44AndPostUncheckedCreateWithoutActivitiesInputInput;
};
export type ActivityCreateOrConnectWithoutUserInputInput = {
    where: WhereInput_18AndWhereInput_19;
    create: WithoutInput_42AndActivityUncheckedCreateWithoutUserInputInput;
};
export type ActivityCreateManyUserInputEnvelopeInput = {
    data?: ActivityCreateManyUserInputInput[];
    skipDuplicates?: t.Boolean;
};
export type ActivityCreateManyUserInputInput = {
    id?: t.String;
    type: ActivityTypeInput;
    createdAt?: t.String;
    postId?: t.String;
    relatedUserId?: t.String;
};
export type UserCreateOrConnectWithoutFollowersInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_40AndUserUncheckedCreateWithoutFollowersInputInput;
};
export type FollowCreateOrConnectWithoutFollowerInputInput = {
    where: WhereInput_10AndWhereInput_11;
    create: WithoutInput_38AndFollowUncheckedCreateWithoutFollowerInputInput;
};
export type WhereInput_10AndWhereInput_11 = {
    id?: t.String;
    followerId_followedId?: FollowFollowerIdFollowedIdCompoundUniqueInputInput;
    AND?: FollowWhereInputInput[];
    OR?: FollowWhereInputInput[];
    NOT?: FollowWhereInputInput[];
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
    follower?: WithoutInput_16AndUserWhereInputInput;
    followed?: WithoutInput_16AndUserWhereInputInput;
};
export type FollowFollowerIdFollowedIdCompoundUniqueInputInput = {
    followerId: t.String;
    followedId: t.String;
};
export type FollowCreateManyFollowerInputEnvelopeInput = {
    data?: FollowCreateManyFollowerInputInput[];
    skipDuplicates?: t.Boolean;
};
export type FollowCreateManyFollowerInputInput = {
    id?: t.String;
    followedId: t.String;
    createdAt?: t.String;
};
export type WhereInput_12AndWhereInput_11 = {
    id?: t.String;
    followerId_followedId?: FollowFollowerIdFollowedIdCompoundUniqueInputInput;
    AND?: FollowWhereInputInput[];
    OR?: FollowWhereInputInput[];
    NOT?: FollowWhereInputInput[];
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
    follower?: WithoutInput_16AndUserWhereInputInput;
    followed?: WithoutInput_16AndUserWhereInputInput;
};
export type UserCreateOrConnectWithoutPostsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_36AndUserUncheckedCreateWithoutPostsInputInput;
};
export type PostCreateOrConnectWithoutStarsInputInput = {
    where: WhereInput_6AndWhereInput_7;
    create: WithoutInput_34AndPostUncheckedCreateWithoutStarsInputInput;
};
export type StarCreateOrConnectWithoutUserInputInput = {
    where: WhereInput_14AndWhereInput_15;
    create: WithoutInput_32AndStarUncheckedCreateWithoutUserInputInput;
};
export type WhereInput_14AndWhereInput_15 = {
    id?: t.String;
    postId_userId?: StarPostIdUserIdCompoundUniqueInputInput;
    AND?: StarWhereInputInput[];
    OR?: StarWhereInputInput[];
    NOT?: StarWhereInputInput[];
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
};
export type StarPostIdUserIdCompoundUniqueInputInput = {
    postId: t.String;
    userId: t.String;
};
export type StarCreateManyUserInputEnvelopeInput = {
    data?: StarCreateManyUserInputInput[];
    skipDuplicates?: t.Boolean;
};
export type StarCreateManyUserInputInput = {
    id?: t.String;
    postId: t.String;
    createdAt?: t.String;
};
export type WhereInput_16AndWhereInput_15 = {
    id?: t.String;
    postId_userId?: StarPostIdUserIdCompoundUniqueInputInput;
    AND?: StarWhereInputInput[];
    OR?: StarWhereInputInput[];
    NOT?: StarWhereInputInput[];
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
};
export type UserCreateOrConnectWithoutFollowingsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_30AndUserUncheckedCreateWithoutFollowingsInputInput;
};
export type FollowCreateOrConnectWithoutFollowedInputInput = {
    where: WhereInput_10AndWhereInput_11;
    create: WithoutInput_28AndFollowUncheckedCreateWithoutFollowedInputInput;
};
export type FollowCreateManyFollowedInputEnvelopeInput = {
    data?: FollowCreateManyFollowedInputInput[];
    skipDuplicates?: t.Boolean;
};
export type FollowCreateManyFollowedInputInput = {
    id?: t.String;
    followerId: t.String;
    createdAt?: t.String;
};
export type UserCreateOrConnectWithoutStarredPostsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_26AndUserUncheckedCreateWithoutStarredPostsInputInput;
};
export type StarCreateOrConnectWithoutPostInputInput = {
    where: WhereInput_14AndWhereInput_15;
    create: WithoutInput_24AndStarUncheckedCreateWithoutPostInputInput;
};
export type StarCreateManyPostInputEnvelopeInput = {
    data?: StarCreateManyPostInputInput[];
    skipDuplicates?: t.Boolean;
};
export type StarCreateManyPostInputInput = {
    id?: t.String;
    userId: t.String;
    createdAt?: t.String;
};
export type PostCreateOrConnectWithoutUserInputInput = {
    where: WhereInput_6AndWhereInput_7;
    create: ObjectAndPostUncheckedCreateWithoutUserInputInput;
};
export type PostCreateManyUserInputEnvelopeInput = {
    data?: PostCreateManyUserInputInput[];
    skipDuplicates?: t.Boolean;
};
export type PostCreateManyUserInputInput = {
    id?: t.String;
    slug: t.String;
    title: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: PrivacyInput;
    language?: LanguageInput;
};
export type WhereInput_8AndWhereInput_7 = {
    id?: t.String;
    slug?: t.String;
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: EnumPrivacyFilterInput;
    language?: EnumLanguageFilterInput_1;
    user?: WithoutInput_16AndUserWhereInputInput;
    stars?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    views?: PostViewListRelationFilterInput;
};
export type WithoutInput_12AndUserUncheckedUpdateInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type OrganizationUpdateOneRequiredWithoutUsersNestedInputInput = {
    create?: ObjectAndOrganizationUncheckedCreateWithoutUsersInputInput;
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInputInput;
    upsert?: OrganizationUpsertWithoutUsersInputInput;
    connect?: WhereInput_3AndWhereInput_4;
    update?: WithoutInput_70AndOrganizationUncheckedUpdateWithoutUsersInputInput;
};
export type OrganizationUpsertWithoutUsersInputInput = {
    update: ObjectAndOrganizationUncheckedUpdateWithoutUsersInputInput;
    create: ObjectAndOrganizationUncheckedCreateWithoutUsersInputInput;
    where?: OrganizationWhereInputInput;
};
export type ObjectAndOrganizationUncheckedUpdateWithoutUsersInputInput = {
    id?: t.String;
};
export type WithoutInput_70AndOrganizationUncheckedUpdateWithoutUsersInputInput = {
    where?: OrganizationWhereInputInput;
    data?: ObjectAndOrganizationUncheckedUpdateWithoutUsersInputInput;
    id?: t.String;
};
export type PostUncheckedUpdateManyWithoutUserNestedInputInput = {
    create?: ObjectAndPostUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutUserInputInput[];
    upsert?: PostUpsertWithWhereUniqueWithoutUserInputInput[];
    createMany?: PostCreateManyUserInputEnvelopeInput;
    set?: WhereInput_8AndWhereInput_7;
    disconnect?: WhereInput_8AndWhereInput_7;
    delete?: WhereInput_8AndWhereInput_7;
    connect?: WhereInput_8AndWhereInput_7;
    update?: PostUpdateWithWhereUniqueWithoutUserInputInput[];
    updateMany?: PostUpdateManyWithWhereWithoutUserInputInput[];
    deleteMany?: PostScalarWhereInputInput[];
};
export type PostUpsertWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_6AndWhereInput_7;
    update: ObjectAndPostUncheckedUpdateWithoutUserInputInput;
    create: ObjectAndPostUncheckedCreateWithoutUserInputInput;
};
export type ObjectAndPostUncheckedUpdateWithoutUserInputInput = {
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: t.String;
    language?: t.String;
    stars?: StarUncheckedUpdateManyWithoutPostNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutPostNestedInputInput;
    views?: PostViewUncheckedUpdateManyWithoutPostNestedInputInput;
};
export type StarUncheckedUpdateManyWithoutPostNestedInputInput = {
    create?: WithoutInput_24AndStarUncheckedCreateWithoutPostInputInput;
    connectOrCreate?: StarCreateOrConnectWithoutPostInputInput[];
    upsert?: StarUpsertWithWhereUniqueWithoutPostInputInput[];
    createMany?: StarCreateManyPostInputEnvelopeInput;
    set?: WhereInput_16AndWhereInput_15;
    disconnect?: WhereInput_16AndWhereInput_15;
    delete?: WhereInput_16AndWhereInput_15;
    connect?: WhereInput_16AndWhereInput_15;
    update?: StarUpdateWithWhereUniqueWithoutPostInputInput[];
    updateMany?: StarUpdateManyWithWhereWithoutPostInputInput[];
    deleteMany?: StarScalarWhereInputInput[];
};
export type StarUpsertWithWhereUniqueWithoutPostInputInput = {
    where: WhereInput_14AndWhereInput_15;
    update: WithoutInput_74AndStarUncheckedUpdateWithoutPostInputInput;
    create: WithoutInput_24AndStarUncheckedCreateWithoutPostInputInput;
};
export type WithoutInput_74AndStarUncheckedUpdateWithoutPostInputInput = {
    user?: UserUpdateOneRequiredWithoutStarredPostsNestedInputInput;
    id?: t.String;
    userId?: t.String;
    createdAt?: t.String;
};
export type UserUpdateOneRequiredWithoutStarredPostsNestedInputInput = {
    create?: WithoutInput_26AndUserUncheckedCreateWithoutStarredPostsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutStarredPostsInputInput;
    upsert?: UserUpsertWithoutStarredPostsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_76AndUserUncheckedUpdateWithoutStarredPostsInputInput;
};
export type UserUpsertWithoutStarredPostsInputInput = {
    update: WithoutInput_82AndUserUncheckedUpdateWithoutStarredPostsInputInput;
    create: WithoutInput_26AndUserUncheckedCreateWithoutStarredPostsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_82AndUserUncheckedUpdateWithoutStarredPostsInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type FollowUncheckedUpdateManyWithoutFollowedNestedInputInput = {
    create?: WithoutInput_28AndFollowUncheckedCreateWithoutFollowedInputInput;
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedInputInput[];
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowedInputInput[];
    createMany?: FollowCreateManyFollowedInputEnvelopeInput;
    set?: WhereInput_12AndWhereInput_11;
    disconnect?: WhereInput_12AndWhereInput_11;
    delete?: WhereInput_12AndWhereInput_11;
    connect?: WhereInput_12AndWhereInput_11;
    update?: FollowUpdateWithWhereUniqueWithoutFollowedInputInput[];
    updateMany?: FollowUpdateManyWithWhereWithoutFollowedInputInput[];
    deleteMany?: FollowScalarWhereInputInput[];
};
export type FollowUpsertWithWhereUniqueWithoutFollowedInputInput = {
    where: WhereInput_10AndWhereInput_11;
    update: WithoutInput_84AndFollowUncheckedUpdateWithoutFollowedInputInput;
    create: WithoutInput_28AndFollowUncheckedCreateWithoutFollowedInputInput;
};
export type WithoutInput_84AndFollowUncheckedUpdateWithoutFollowedInputInput = {
    follower?: UserUpdateOneRequiredWithoutFollowingsNestedInputInput;
    id?: t.String;
    followerId?: t.String;
    createdAt?: t.String;
};
export type UserUpdateOneRequiredWithoutFollowingsNestedInputInput = {
    create?: WithoutInput_30AndUserUncheckedCreateWithoutFollowingsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutFollowingsInputInput;
    upsert?: UserUpsertWithoutFollowingsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_86AndUserUncheckedUpdateWithoutFollowingsInputInput;
};
export type UserUpsertWithoutFollowingsInputInput = {
    update: WithoutInput_92AndUserUncheckedUpdateWithoutFollowingsInputInput;
    create: WithoutInput_30AndUserUncheckedCreateWithoutFollowingsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_92AndUserUncheckedUpdateWithoutFollowingsInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type StarUncheckedUpdateManyWithoutUserNestedInputInput = {
    create?: WithoutInput_32AndStarUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: StarCreateOrConnectWithoutUserInputInput[];
    upsert?: StarUpsertWithWhereUniqueWithoutUserInputInput[];
    createMany?: StarCreateManyUserInputEnvelopeInput;
    set?: WhereInput_16AndWhereInput_15;
    disconnect?: WhereInput_16AndWhereInput_15;
    delete?: WhereInput_16AndWhereInput_15;
    connect?: WhereInput_16AndWhereInput_15;
    update?: StarUpdateWithWhereUniqueWithoutUserInputInput[];
    updateMany?: StarUpdateManyWithWhereWithoutUserInputInput[];
    deleteMany?: StarScalarWhereInputInput[];
};
export type StarUpsertWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_14AndWhereInput_15;
    update: WithoutInput_94AndStarUncheckedUpdateWithoutUserInputInput;
    create: WithoutInput_32AndStarUncheckedCreateWithoutUserInputInput;
};
export type WithoutInput_94AndStarUncheckedUpdateWithoutUserInputInput = {
    post?: PostUpdateOneWithoutStarsNestedInputInput;
    id?: t.String;
    postId?: t.String;
    createdAt?: t.String;
};
export type PostUpdateOneWithoutStarsNestedInputInput = {
    create?: WithoutInput_34AndPostUncheckedCreateWithoutStarsInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutStarsInputInput;
    upsert?: PostUpsertWithoutStarsInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_6AndWhereInput_7;
    update?: WithoutInput_96AndPostUncheckedUpdateWithoutStarsInputInput;
};
export type PostUpsertWithoutStarsInputInput = {
    update: WithoutInput_102AndPostUncheckedUpdateWithoutStarsInputInput;
    create: WithoutInput_34AndPostUncheckedCreateWithoutStarsInputInput;
    where?: PostWhereInputInput;
};
export type WithoutInput_102AndPostUncheckedUpdateWithoutStarsInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: t.String;
    language?: t.String;
    activities?: ActivityUncheckedUpdateManyWithoutPostNestedInputInput;
    views?: PostViewUncheckedUpdateManyWithoutPostNestedInputInput;
};
export type UserUpdateOneRequiredWithoutPostsNestedInputInput = {
    create?: WithoutInput_36AndUserUncheckedCreateWithoutPostsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPostsInputInput;
    upsert?: UserUpsertWithoutPostsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_104AndUserUncheckedUpdateWithoutPostsInputInput;
};
export type UserUpsertWithoutPostsInputInput = {
    update: WithoutInput_110AndUserUncheckedUpdateWithoutPostsInputInput;
    create: WithoutInput_36AndUserUncheckedCreateWithoutPostsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_110AndUserUncheckedUpdateWithoutPostsInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type FollowUncheckedUpdateManyWithoutFollowerNestedInputInput = {
    create?: WithoutInput_38AndFollowUncheckedCreateWithoutFollowerInputInput;
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInputInput[];
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowerInputInput[];
    createMany?: FollowCreateManyFollowerInputEnvelopeInput;
    set?: WhereInput_12AndWhereInput_11;
    disconnect?: WhereInput_12AndWhereInput_11;
    delete?: WhereInput_12AndWhereInput_11;
    connect?: WhereInput_12AndWhereInput_11;
    update?: FollowUpdateWithWhereUniqueWithoutFollowerInputInput[];
    updateMany?: FollowUpdateManyWithWhereWithoutFollowerInputInput[];
    deleteMany?: FollowScalarWhereInputInput[];
};
export type FollowUpsertWithWhereUniqueWithoutFollowerInputInput = {
    where: WhereInput_10AndWhereInput_11;
    update: WithoutInput_112AndFollowUncheckedUpdateWithoutFollowerInputInput;
    create: WithoutInput_38AndFollowUncheckedCreateWithoutFollowerInputInput;
};
export type WithoutInput_112AndFollowUncheckedUpdateWithoutFollowerInputInput = {
    followed?: UserUpdateOneRequiredWithoutFollowersNestedInputInput;
    id?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
};
export type UserUpdateOneRequiredWithoutFollowersNestedInputInput = {
    create?: WithoutInput_40AndUserUncheckedCreateWithoutFollowersInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInputInput;
    upsert?: UserUpsertWithoutFollowersInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_114AndUserUncheckedUpdateWithoutFollowersInputInput;
};
export type UserUpsertWithoutFollowersInputInput = {
    update: WithoutInput_120AndUserUncheckedUpdateWithoutFollowersInputInput;
    create: WithoutInput_40AndUserUncheckedCreateWithoutFollowersInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_120AndUserUncheckedUpdateWithoutFollowersInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type ActivityUncheckedUpdateManyWithoutUserNestedInputInput = {
    create?: WithoutInput_42AndActivityUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInputInput[];
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInputInput[];
    createMany?: ActivityCreateManyUserInputEnvelopeInput;
    set?: WhereInput_20AndWhereInput_19;
    disconnect?: WhereInput_20AndWhereInput_19;
    delete?: WhereInput_20AndWhereInput_19;
    connect?: WhereInput_20AndWhereInput_19;
    update?: ActivityUpdateWithWhereUniqueWithoutUserInputInput[];
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInputInput[];
    deleteMany?: ActivityScalarWhereInputInput[];
};
export type ActivityUpsertWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_18AndWhereInput_19;
    update: WithoutInput_122AndActivityUncheckedUpdateWithoutUserInputInput;
    create: WithoutInput_42AndActivityUncheckedCreateWithoutUserInputInput;
};
export type WithoutInput_122AndActivityUncheckedUpdateWithoutUserInputInput = {
    post?: PostUpdateOneWithoutActivitiesNestedInputInput;
    relatedUser?: UserUpdateOneWithoutRelatedActivitiesNestedInputInput;
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    relatedUserId?: t.String;
};
export type PostUpdateOneWithoutActivitiesNestedInputInput = {
    create?: WithoutInput_44AndPostUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutActivitiesInputInput;
    upsert?: PostUpsertWithoutActivitiesInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_6AndWhereInput_7;
    update?: WithoutInput_124AndPostUncheckedUpdateWithoutActivitiesInputInput;
};
export type PostUpsertWithoutActivitiesInputInput = {
    update: WithoutInput_130AndPostUncheckedUpdateWithoutActivitiesInputInput;
    create: WithoutInput_44AndPostUncheckedCreateWithoutActivitiesInputInput;
    where?: PostWhereInputInput;
};
export type WithoutInput_130AndPostUncheckedUpdateWithoutActivitiesInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: t.String;
    language?: t.String;
    stars?: StarUncheckedUpdateManyWithoutPostNestedInputInput;
    views?: PostViewUncheckedUpdateManyWithoutPostNestedInputInput;
};
export type PostViewUncheckedUpdateManyWithoutPostNestedInputInput = {
    create?: WithoutInput_46AndPostViewUncheckedCreateWithoutPostInputInput;
    connectOrCreate?: PostViewCreateOrConnectWithoutPostInputInput[];
    upsert?: PostViewUpsertWithWhereUniqueWithoutPostInputInput[];
    createMany?: PostViewCreateManyPostInputEnvelopeInput;
    set?: WhereInput_26AndWhereInput_25;
    disconnect?: WhereInput_26AndWhereInput_25;
    delete?: WhereInput_26AndWhereInput_25;
    connect?: WhereInput_26AndWhereInput_25;
    update?: PostViewUpdateWithWhereUniqueWithoutPostInputInput[];
    updateMany?: PostViewUpdateManyWithWhereWithoutPostInputInput[];
    deleteMany?: PostViewScalarWhereInputInput[];
};
export type PostViewUpsertWithWhereUniqueWithoutPostInputInput = {
    where: WhereInput_24AndWhereInput_25;
    update: WithoutInput_132AndPostViewUncheckedUpdateWithoutPostInputInput;
    create: WithoutInput_46AndPostViewUncheckedCreateWithoutPostInputInput;
};
export type WithoutInput_132AndPostViewUncheckedUpdateWithoutPostInputInput = {
    viewedBy?: UserUpdateOneRequiredWithoutPerformedPostViewsNestedInputInput;
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type UserUpdateOneRequiredWithoutPerformedPostViewsNestedInputInput = {
    create?: WithoutInput_48AndUserUncheckedCreateWithoutPerformedPostViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPerformedPostViewsInputInput;
    upsert?: UserUpsertWithoutPerformedPostViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_134AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput;
};
export type UserUpsertWithoutPerformedPostViewsInputInput = {
    update: WithoutInput_140AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput;
    create: WithoutInput_48AndUserUncheckedCreateWithoutPerformedPostViewsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_140AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
};
export type ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput = {
    create?: WithoutInput_50AndActivityUncheckedCreateWithoutRelatedUserInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutRelatedUserInputInput[];
    upsert?: ActivityUpsertWithWhereUniqueWithoutRelatedUserInputInput[];
    createMany?: ActivityCreateManyRelatedUserInputEnvelopeInput;
    set?: WhereInput_20AndWhereInput_19;
    disconnect?: WhereInput_20AndWhereInput_19;
    delete?: WhereInput_20AndWhereInput_19;
    connect?: WhereInput_20AndWhereInput_19;
    update?: ActivityUpdateWithWhereUniqueWithoutRelatedUserInputInput[];
    updateMany?: ActivityUpdateManyWithWhereWithoutRelatedUserInputInput[];
    deleteMany?: ActivityScalarWhereInputInput[];
};
export type ActivityUpsertWithWhereUniqueWithoutRelatedUserInputInput = {
    where: WhereInput_18AndWhereInput_19;
    update: WithoutInput_142AndActivityUncheckedUpdateWithoutRelatedUserInputInput;
    create: WithoutInput_50AndActivityUncheckedCreateWithoutRelatedUserInputInput;
};
export type WithoutInput_142AndActivityUncheckedUpdateWithoutRelatedUserInputInput = {
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInputInput;
    post?: PostUpdateOneWithoutActivitiesNestedInputInput;
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
};
export type UserUpdateOneRequiredWithoutActivitiesNestedInputInput = {
    create?: WithoutInput_52AndUserUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInputInput;
    upsert?: UserUpsertWithoutActivitiesInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_144AndUserUncheckedUpdateWithoutActivitiesInputInput;
};
export type UserUpsertWithoutActivitiesInputInput = {
    update: WithoutInput_150AndUserUncheckedUpdateWithoutActivitiesInputInput;
    create: WithoutInput_52AndUserUncheckedCreateWithoutActivitiesInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_150AndUserUncheckedUpdateWithoutActivitiesInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput = {
    create?: WithoutInput_54AndUserViewUncheckedCreateWithoutViewedByInputInput;
    connectOrCreate?: UserViewCreateOrConnectWithoutViewedByInputInput[];
    upsert?: UserViewUpsertWithWhereUniqueWithoutViewedByInputInput[];
    createMany?: UserViewCreateManyViewedByInputEnvelopeInput;
    set?: WhereInput_23AndWhereInput_22;
    disconnect?: WhereInput_23AndWhereInput_22;
    delete?: WhereInput_23AndWhereInput_22;
    connect?: WhereInput_23AndWhereInput_22;
    update?: UserViewUpdateWithWhereUniqueWithoutViewedByInputInput[];
    updateMany?: UserViewUpdateManyWithWhereWithoutViewedByInputInput[];
    deleteMany?: UserViewScalarWhereInputInput[];
};
export type UserViewUpsertWithWhereUniqueWithoutViewedByInputInput = {
    where: WhereInput_21AndWhereInput_22;
    update: WithoutInput_152AndUserViewUncheckedUpdateWithoutViewedByInputInput;
    create: WithoutInput_54AndUserViewUncheckedCreateWithoutViewedByInputInput;
};
export type WithoutInput_152AndUserViewUncheckedUpdateWithoutViewedByInputInput = {
    user?: UserUpdateOneRequiredWithoutPerformedUserViewsNestedInputInput;
    id?: t.Number;
    userId?: t.String;
    createdAt?: t.String;
};
export type UserUpdateOneRequiredWithoutPerformedUserViewsNestedInputInput = {
    create?: WithoutInput_56AndUserUncheckedCreateWithoutPerformedUserViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPerformedUserViewsInputInput;
    upsert?: UserUpsertWithoutPerformedUserViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_154AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput;
};
export type UserUpsertWithoutPerformedUserViewsInputInput = {
    update: WithoutInput_160AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput;
    create: WithoutInput_56AndUserUncheckedCreateWithoutPerformedUserViewsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_160AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput = {
    create?: WithoutInput_58AndPostViewUncheckedCreateWithoutViewedByInputInput;
    connectOrCreate?: PostViewCreateOrConnectWithoutViewedByInputInput[];
    upsert?: PostViewUpsertWithWhereUniqueWithoutViewedByInputInput[];
    createMany?: PostViewCreateManyViewedByInputEnvelopeInput;
    set?: WhereInput_26AndWhereInput_25;
    disconnect?: WhereInput_26AndWhereInput_25;
    delete?: WhereInput_26AndWhereInput_25;
    connect?: WhereInput_26AndWhereInput_25;
    update?: PostViewUpdateWithWhereUniqueWithoutViewedByInputInput[];
    updateMany?: PostViewUpdateManyWithWhereWithoutViewedByInputInput[];
    deleteMany?: PostViewScalarWhereInputInput[];
};
export type PostViewUpsertWithWhereUniqueWithoutViewedByInputInput = {
    where: WhereInput_24AndWhereInput_25;
    update: WithoutInput_162AndPostViewUncheckedUpdateWithoutViewedByInputInput;
    create: WithoutInput_58AndPostViewUncheckedCreateWithoutViewedByInputInput;
};
export type WithoutInput_162AndPostViewUncheckedUpdateWithoutViewedByInputInput = {
    post?: PostUpdateOneRequiredWithoutViewsNestedInputInput;
    id?: t.Number;
    postId?: t.String;
    createdAt?: t.String;
};
export type PostUpdateOneRequiredWithoutViewsNestedInputInput = {
    create?: WithoutInput_60AndPostUncheckedCreateWithoutViewsInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutViewsInputInput;
    upsert?: PostUpsertWithoutViewsInputInput;
    connect?: WhereInput_6AndWhereInput_7;
    update?: WithoutInput_164AndPostUncheckedUpdateWithoutViewsInputInput;
};
export type PostUpsertWithoutViewsInputInput = {
    update: WithoutInput_170AndPostUncheckedUpdateWithoutViewsInputInput;
    create: WithoutInput_60AndPostUncheckedCreateWithoutViewsInputInput;
    where?: PostWhereInputInput;
};
export type WithoutInput_170AndPostUncheckedUpdateWithoutViewsInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: t.String;
    language?: t.String;
    stars?: StarUncheckedUpdateManyWithoutPostNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutPostNestedInputInput;
};
export type ActivityUncheckedUpdateManyWithoutPostNestedInputInput = {
    create?: WithoutInput_62AndActivityUncheckedCreateWithoutPostInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutPostInputInput[];
    upsert?: ActivityUpsertWithWhereUniqueWithoutPostInputInput[];
    createMany?: ActivityCreateManyPostInputEnvelopeInput;
    set?: WhereInput_20AndWhereInput_19;
    disconnect?: WhereInput_20AndWhereInput_19;
    delete?: WhereInput_20AndWhereInput_19;
    connect?: WhereInput_20AndWhereInput_19;
    update?: ActivityUpdateWithWhereUniqueWithoutPostInputInput[];
    updateMany?: ActivityUpdateManyWithWhereWithoutPostInputInput[];
    deleteMany?: ActivityScalarWhereInputInput[];
};
export type ActivityUpsertWithWhereUniqueWithoutPostInputInput = {
    where: WhereInput_18AndWhereInput_19;
    update: WithoutInput_172AndActivityUncheckedUpdateWithoutPostInputInput;
    create: WithoutInput_62AndActivityUncheckedCreateWithoutPostInputInput;
};
export type WithoutInput_172AndActivityUncheckedUpdateWithoutPostInputInput = {
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInputInput;
    relatedUser?: UserUpdateOneWithoutRelatedActivitiesNestedInputInput;
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    relatedUserId?: t.String;
};
export type UserUpdateOneWithoutRelatedActivitiesNestedInputInput = {
    create?: WithoutInput_64AndUserUncheckedCreateWithoutRelatedActivitiesInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutRelatedActivitiesInputInput;
    upsert?: UserUpsertWithoutRelatedActivitiesInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_174AndUserUncheckedUpdateWithoutRelatedActivitiesInputInput;
};
export type UserUpsertWithoutRelatedActivitiesInputInput = {
    update: WithoutInput_180AndUserUncheckedUpdateWithoutRelatedActivitiesInputInput;
    create: WithoutInput_64AndUserUncheckedCreateWithoutRelatedActivitiesInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_180AndUserUncheckedUpdateWithoutRelatedActivitiesInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type UserViewUncheckedUpdateManyWithoutUserNestedInputInput = {
    create?: WithoutInput_66AndUserViewUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: UserViewCreateOrConnectWithoutUserInputInput[];
    upsert?: UserViewUpsertWithWhereUniqueWithoutUserInputInput[];
    createMany?: UserViewCreateManyUserInputEnvelopeInput;
    set?: WhereInput_23AndWhereInput_22;
    disconnect?: WhereInput_23AndWhereInput_22;
    delete?: WhereInput_23AndWhereInput_22;
    connect?: WhereInput_23AndWhereInput_22;
    update?: UserViewUpdateWithWhereUniqueWithoutUserInputInput[];
    updateMany?: UserViewUpdateManyWithWhereWithoutUserInputInput[];
    deleteMany?: UserViewScalarWhereInputInput[];
};
export type UserViewUpsertWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_21AndWhereInput_22;
    update: WithoutInput_182AndUserViewUncheckedUpdateWithoutUserInputInput;
    create: WithoutInput_66AndUserViewUncheckedCreateWithoutUserInputInput;
};
export type WithoutInput_182AndUserViewUncheckedUpdateWithoutUserInputInput = {
    viewedBy?: UserUpdateOneRequiredWithoutReceivedUserViewsNestedInputInput;
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type UserUpdateOneRequiredWithoutReceivedUserViewsNestedInputInput = {
    create?: WithoutInput_68AndUserUncheckedCreateWithoutReceivedUserViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutReceivedUserViewsInputInput;
    upsert?: UserUpsertWithoutReceivedUserViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_184AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput;
};
export type UserUpsertWithoutReceivedUserViewsInputInput = {
    update: WithoutInput_190AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput;
    create: WithoutInput_68AndUserUncheckedCreateWithoutReceivedUserViewsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_190AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type WithoutInput_184AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_190AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type UserViewUpdateWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_21AndWhereInput_22;
    data: WithoutInput_182AndUserViewUncheckedUpdateWithoutUserInputInput;
};
export type UserViewUpdateManyWithWhereWithoutUserInputInput = {
    where: UserViewScalarWhereInputInput;
    data: ObjectAndUserViewUncheckedUpdateManyWithoutUserInputInput;
};
export type UserViewScalarWhereInputInput = {
    AND?: UserViewScalarWhereInputInput[];
    OR?: UserViewScalarWhereInputInput[];
    NOT?: UserViewScalarWhereInputInput[];
    id?: t.Number;
    userId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type ObjectAndUserViewUncheckedUpdateManyWithoutUserInputInput = {
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type WithoutInput_174AndUserUncheckedUpdateWithoutRelatedActivitiesInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_180AndUserUncheckedUpdateWithoutRelatedActivitiesInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type ActivityUpdateWithWhereUniqueWithoutPostInputInput = {
    where: WhereInput_18AndWhereInput_19;
    data: WithoutInput_172AndActivityUncheckedUpdateWithoutPostInputInput;
};
export type ActivityUpdateManyWithWhereWithoutPostInputInput = {
    where: ActivityScalarWhereInputInput;
    data: ObjectAndActivityUncheckedUpdateManyWithoutPostInputInput;
};
export type ActivityScalarWhereInputInput = {
    AND?: ActivityScalarWhereInputInput[];
    OR?: ActivityScalarWhereInputInput[];
    NOT?: ActivityScalarWhereInputInput[];
    id?: t.String;
    type?: EnumActivityTypeFilterInput;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    relatedUserId?: t.String;
};
export type ObjectAndActivityUncheckedUpdateManyWithoutPostInputInput = {
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    relatedUserId?: t.String;
};
export type WithoutInput_164AndPostUncheckedUpdateWithoutViewsInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    where?: PostWhereInputInput;
    data?: WithoutInput_170AndPostUncheckedUpdateWithoutViewsInputInput;
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: t.String;
    language?: t.String;
    stars?: StarUncheckedUpdateManyWithoutPostNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutPostNestedInputInput;
};
export type PostViewUpdateWithWhereUniqueWithoutViewedByInputInput = {
    where: WhereInput_24AndWhereInput_25;
    data: WithoutInput_162AndPostViewUncheckedUpdateWithoutViewedByInputInput;
};
export type PostViewUpdateManyWithWhereWithoutViewedByInputInput = {
    where: PostViewScalarWhereInputInput;
    data: ObjectAndPostViewUncheckedUpdateManyWithoutViewedByInputInput;
};
export type PostViewScalarWhereInputInput = {
    AND?: PostViewScalarWhereInputInput[];
    OR?: PostViewScalarWhereInputInput[];
    NOT?: PostViewScalarWhereInputInput[];
    id?: t.Number;
    postId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type ObjectAndPostViewUncheckedUpdateManyWithoutViewedByInputInput = {
    id?: t.Number;
    postId?: t.String;
    createdAt?: t.String;
};
export type WithoutInput_154AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_160AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type UserViewUpdateWithWhereUniqueWithoutViewedByInputInput = {
    where: WhereInput_21AndWhereInput_22;
    data: WithoutInput_152AndUserViewUncheckedUpdateWithoutViewedByInputInput;
};
export type UserViewUpdateManyWithWhereWithoutViewedByInputInput = {
    where: UserViewScalarWhereInputInput;
    data: ObjectAndUserViewUncheckedUpdateManyWithoutViewedByInputInput;
};
export type ObjectAndUserViewUncheckedUpdateManyWithoutViewedByInputInput = {
    id?: t.Number;
    userId?: t.String;
    createdAt?: t.String;
};
export type WithoutInput_144AndUserUncheckedUpdateWithoutActivitiesInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_150AndUserUncheckedUpdateWithoutActivitiesInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type ActivityUpdateWithWhereUniqueWithoutRelatedUserInputInput = {
    where: WhereInput_18AndWhereInput_19;
    data: WithoutInput_142AndActivityUncheckedUpdateWithoutRelatedUserInputInput;
};
export type ActivityUpdateManyWithWhereWithoutRelatedUserInputInput = {
    where: ActivityScalarWhereInputInput;
    data: ObjectAndActivityUncheckedUpdateManyWithoutRelatedUserInputInput;
};
export type ObjectAndActivityUncheckedUpdateManyWithoutRelatedUserInputInput = {
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
};
export type WithoutInput_134AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_140AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
};
export type PostViewUpdateWithWhereUniqueWithoutPostInputInput = {
    where: WhereInput_24AndWhereInput_25;
    data: WithoutInput_132AndPostViewUncheckedUpdateWithoutPostInputInput;
};
export type PostViewUpdateManyWithWhereWithoutPostInputInput = {
    where: PostViewScalarWhereInputInput;
    data: ObjectAndPostViewUncheckedUpdateManyWithoutPostInputInput;
};
export type ObjectAndPostViewUncheckedUpdateManyWithoutPostInputInput = {
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type WithoutInput_124AndPostUncheckedUpdateWithoutActivitiesInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    where?: PostWhereInputInput;
    data?: WithoutInput_130AndPostUncheckedUpdateWithoutActivitiesInputInput;
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: t.String;
    language?: t.String;
    stars?: StarUncheckedUpdateManyWithoutPostNestedInputInput;
    views?: PostViewUncheckedUpdateManyWithoutPostNestedInputInput;
};
export type ActivityUpdateWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_18AndWhereInput_19;
    data: WithoutInput_122AndActivityUncheckedUpdateWithoutUserInputInput;
};
export type ActivityUpdateManyWithWhereWithoutUserInputInput = {
    where: ActivityScalarWhereInputInput;
    data: ObjectAndActivityUncheckedUpdateManyWithoutUserInputInput;
};
export type ObjectAndActivityUncheckedUpdateManyWithoutUserInputInput = {
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    relatedUserId?: t.String;
};
export type WithoutInput_114AndUserUncheckedUpdateWithoutFollowersInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_120AndUserUncheckedUpdateWithoutFollowersInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type FollowUpdateWithWhereUniqueWithoutFollowerInputInput = {
    where: WhereInput_10AndWhereInput_11;
    data: WithoutInput_112AndFollowUncheckedUpdateWithoutFollowerInputInput;
};
export type FollowUpdateManyWithWhereWithoutFollowerInputInput = {
    where: FollowScalarWhereInputInput;
    data: ObjectAndFollowUncheckedUpdateManyWithoutFollowerInputInput;
};
export type FollowScalarWhereInputInput = {
    AND?: FollowScalarWhereInputInput[];
    OR?: FollowScalarWhereInputInput[];
    NOT?: FollowScalarWhereInputInput[];
    id?: t.String;
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
};
export type ObjectAndFollowUncheckedUpdateManyWithoutFollowerInputInput = {
    id?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
};
export type WithoutInput_104AndUserUncheckedUpdateWithoutPostsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_110AndUserUncheckedUpdateWithoutPostsInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type WithoutInput_96AndPostUncheckedUpdateWithoutStarsInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    where?: PostWhereInputInput;
    data?: WithoutInput_102AndPostUncheckedUpdateWithoutStarsInputInput;
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: t.String;
    language?: t.String;
    activities?: ActivityUncheckedUpdateManyWithoutPostNestedInputInput;
    views?: PostViewUncheckedUpdateManyWithoutPostNestedInputInput;
};
export type StarUpdateWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_14AndWhereInput_15;
    data: WithoutInput_94AndStarUncheckedUpdateWithoutUserInputInput;
};
export type StarUpdateManyWithWhereWithoutUserInputInput = {
    where: StarScalarWhereInputInput;
    data: ObjectAndStarUncheckedUpdateManyWithoutUserInputInput;
};
export type StarScalarWhereInputInput = {
    AND?: StarScalarWhereInputInput[];
    OR?: StarScalarWhereInputInput[];
    NOT?: StarScalarWhereInputInput[];
    id?: t.String;
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
};
export type ObjectAndStarUncheckedUpdateManyWithoutUserInputInput = {
    id?: t.String;
    postId?: t.String;
    createdAt?: t.String;
};
export type WithoutInput_86AndUserUncheckedUpdateWithoutFollowingsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_92AndUserUncheckedUpdateWithoutFollowingsInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type FollowUpdateWithWhereUniqueWithoutFollowedInputInput = {
    where: WhereInput_10AndWhereInput_11;
    data: WithoutInput_84AndFollowUncheckedUpdateWithoutFollowedInputInput;
};
export type FollowUpdateManyWithWhereWithoutFollowedInputInput = {
    where: FollowScalarWhereInputInput;
    data: ObjectAndFollowUncheckedUpdateManyWithoutFollowedInputInput;
};
export type ObjectAndFollowUncheckedUpdateManyWithoutFollowedInputInput = {
    id?: t.String;
    followerId?: t.String;
    createdAt?: t.String;
};
export type WithoutInput_76AndUserUncheckedUpdateWithoutStarredPostsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_82AndUserUncheckedUpdateWithoutStarredPostsInputInput;
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type StarUpdateWithWhereUniqueWithoutPostInputInput = {
    where: WhereInput_14AndWhereInput_15;
    data: WithoutInput_74AndStarUncheckedUpdateWithoutPostInputInput;
};
export type StarUpdateManyWithWhereWithoutPostInputInput = {
    where: StarScalarWhereInputInput;
    data: ObjectAndStarUncheckedUpdateManyWithoutPostInputInput;
};
export type ObjectAndStarUncheckedUpdateManyWithoutPostInputInput = {
    id?: t.String;
    userId?: t.String;
    createdAt?: t.String;
};
export type PostUpdateWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_6AndWhereInput_7;
    data: ObjectAndPostUncheckedUpdateWithoutUserInputInput;
};
export type PostUpdateManyWithWhereWithoutUserInputInput = {
    where: PostScalarWhereInputInput;
    data: ObjectAndPostUncheckedUpdateManyWithoutUserInputInput;
};
export type PostScalarWhereInputInput = {
    AND?: PostScalarWhereInputInput[];
    OR?: PostScalarWhereInputInput[];
    NOT?: PostScalarWhereInputInput[];
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: EnumPrivacyFilterInput;
    language?: EnumLanguageFilterInput_1;
};
export type ObjectAndPostUncheckedUpdateManyWithoutUserInputInput = {
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: t.String;
    language?: t.String;
};
export type OmitInput_21 = {
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    organization?: WithoutInput_14AndOrganizationWhereInputInput;
    posts?: PostListRelationFilterInput;
    followers?: FollowListRelationFilterInput;
    followings?: FollowListRelationFilterInput;
    starredPosts?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    relatedActivities?: ActivityListRelationFilterInput;
    receivedUserViews?: UserViewListRelationFilterInput;
    performedUserViews?: UserViewListRelationFilterInput;
    performedPostViews?: PostViewListRelationFilterInput;
};
export type ConnectionArgumentsInput = {
    first?: t.Number;
    after?: t.String;
    last?: t.Number;
    before?: t.String;
};
export type StarOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    postId?: SortOrderInput;
    userId?: SortOrderInput;
    createdAt?: SortOrderInput;
    user?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    post?: PostOrderByWithRelationAndSearchRelevanceInputInput;
    _relevance?: StarOrderByRelevanceInputInput;
};
export type PostOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    slug?: SortOrderInput;
    title?: SortOrderInput;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: SortOrderInput;
    createdAt?: SortOrderInput;
    updatedAt?: SortOrderInput;
    privacy?: SortOrderInput;
    language?: SortOrderInput;
    user?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    stars?: StarOrderByRelationAggregateInputInput;
    activities?: ActivityOrderByRelationAggregateInputInput;
    views?: PostViewOrderByRelationAggregateInputInput;
    _relevance?: PostOrderByRelevanceInputInput;
};
export type PostOrderByRelevanceInputInput = {
    fields: t.String;
    sort: SortOrderInput;
    search: t.String;
};
export type StarOrderByRelevanceInputInput = {
    fields: t.String;
    sort: SortOrderInput;
    search: t.String;
};
export type OmitInput_28 = {
    user?: UserCreateNestedOneWithoutPostsInputInput;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutPostInputInput;
    content?: t.String;
    summary?: t.String;
    title: t.String;
    views?: PostViewUncheckedCreateNestedManyWithoutPostInputInput;
    userId?: t.String;
    slug: t.String;
    avatarURL?: t.String;
    privacy?: PrivacyInput;
    stars?: StarUncheckedCreateNestedManyWithoutPostInputInput;
};
export type WithoutInputAndPostUncheckedUpdateInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    privacy?: t.String;
    language?: t.String;
    stars?: StarUncheckedUpdateManyWithoutPostNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutPostNestedInputInput;
    views?: PostViewUncheckedUpdateManyWithoutPostNestedInputInput;
};
export type OmitInput_29 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: EnumLanguageFilterInput_1;
    activities?: ActivityListRelationFilterInput;
    content?: t.String;
    summary?: t.String;
    title?: t.String;
    views?: PostViewListRelationFilterInput;
    userId?: t.String;
    slug?: t.String;
    avatarURL?: t.String;
    privacy?: EnumPrivacyFilterInput;
    stars?: StarListRelationFilterInput;
};
export type OmitInput_22 = {
    user?: UserCreateNestedOneWithoutStarredPostsInputInput;
    id?: t.String;
    createdAt?: t.String;
    userId?: t.String;
};
export type WithoutInput_4AndStarUncheckedUpdateInputInput = {
    user?: UserUpdateOneRequiredWithoutStarredPostsNestedInputInput;
    post?: PostUpdateOneWithoutStarsNestedInputInput;
    id?: t.String;
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
};
export type OmitInput_23 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    AND?: StarWhereInputInput[];
    OR?: StarWhereInputInput[];
    NOT?: StarWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId_userId?: StarPostIdUserIdCompoundUniqueInputInput;
};
export type ActivityOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    type?: SortOrderInput;
    createdAt?: SortOrderInput;
    userId?: SortOrderInput;
    postId?: t.String;
    relatedUserId?: t.String;
    user?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    post?: PostOrderByWithRelationAndSearchRelevanceInputInput;
    relatedUser?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    _relevance?: ActivityOrderByRelevanceInputInput;
};
export type ActivityOrderByRelevanceInputInput = {
    fields: t.String;
    sort: SortOrderInput;
    search: t.String;
};
export type OmitInput_24 = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    type: ActivityTypeInput;
    relatedUser?: UserCreateNestedOneWithoutRelatedActivitiesInputInput;
    relatedUserId?: t.String;
};
export type WithoutInput_6AndActivityUncheckedUpdateInputInput = {
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInputInput;
    post?: PostUpdateOneWithoutActivitiesNestedInputInput;
    relatedUser?: UserUpdateOneWithoutRelatedActivitiesNestedInputInput;
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    relatedUserId?: t.String;
};
export type OmitInput_25 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    type?: EnumActivityTypeFilterInput;
    relatedUser?: WithoutInput_20AndUserWhereInputInput;
    relatedUserId?: t.String;
};
export type PostViewOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    postId?: SortOrderInput;
    viewedById?: SortOrderInput;
    createdAt?: SortOrderInput;
    post?: PostOrderByWithRelationAndSearchRelevanceInputInput;
    viewedBy?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    _relevance?: PostViewOrderByRelevanceInputInput;
};
export type PostViewOrderByRelevanceInputInput = {
    fields: t.String;
    sort: SortOrderInput;
    search: t.String;
};
export type OmitInput_26 = {
    id?: t.Number;
    createdAt?: t.String;
    viewedBy?: UserCreateNestedOneWithoutPerformedPostViewsInputInput;
    viewedById?: t.String;
};
export type WithoutInput_10AndPostViewUncheckedUpdateInputInput = {
    post?: PostUpdateOneRequiredWithoutViewsNestedInputInput;
    viewedBy?: UserUpdateOneRequiredWithoutPerformedPostViewsNestedInputInput;
    id?: t.Number;
    postId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type OmitInput_27 = {
    AND?: PostViewWhereInputInput[];
    OR?: PostViewWhereInputInput[];
    NOT?: PostViewWhereInputInput[];
    id?: t.Number;
    createdAt?: t.String;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
    viewedById?: t.String;
};
export type OmitInput_30 = {
    id: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type OmitInput_31 = {
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    id?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostListRelationFilterInput;
    followers?: FollowListRelationFilterInput;
    followings?: FollowListRelationFilterInput;
    starredPosts?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    relatedActivities?: ActivityListRelationFilterInput;
    receivedUserViews?: UserViewListRelationFilterInput;
    performedUserViews?: UserViewListRelationFilterInput;
    performedPostViews?: PostViewListRelationFilterInput;
};
export type OmitInput = {
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInputInput;
};
export type UserUncheckedCreateNestedManyWithoutOrganizationInputInput = {
    create?: ObjectAndUserUncheckedCreateWithoutOrganizationInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInputInput[];
    createMany?: UserCreateManyOrganizationInputEnvelopeInput;
    connect?: WhereInput_29AndWhereInput_28;
};
export type ObjectAndUserUncheckedCreateWithoutOrganizationInputInput = {
    id: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    posts?: PostUncheckedCreateNestedManyWithoutUserInputInput;
    followers?: FollowUncheckedCreateNestedManyWithoutFollowedInputInput;
    followings?: FollowUncheckedCreateNestedManyWithoutFollowerInputInput;
    starredPosts?: StarUncheckedCreateNestedManyWithoutUserInputInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInputInput;
    relatedActivities?: ActivityUncheckedCreateNestedManyWithoutRelatedUserInputInput;
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type UserCreateOrConnectWithoutOrganizationInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: ObjectAndUserUncheckedCreateWithoutOrganizationInputInput;
};
export type UserCreateManyOrganizationInputEnvelopeInput = {
    data?: UserCreateManyOrganizationInputInput[];
    skipDuplicates?: t.Boolean;
};
export type UserCreateManyOrganizationInputInput = {
    id: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
};
export type WhereInput_29AndWhereInput_28 = {
    id?: t.String;
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    organization?: WithoutInput_14AndOrganizationWhereInputInput;
    posts?: PostListRelationFilterInput;
    followers?: FollowListRelationFilterInput;
    followings?: FollowListRelationFilterInput;
    starredPosts?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    relatedActivities?: ActivityListRelationFilterInput;
    receivedUserViews?: UserViewListRelationFilterInput;
    performedUserViews?: UserViewListRelationFilterInput;
    performedPostViews?: PostViewListRelationFilterInput;
};
export type ObjectAndOrganizationUncheckedUpdateInputInput = {
    id?: t.String;
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInputInput;
};
export type UserUncheckedUpdateManyWithoutOrganizationNestedInputInput = {
    create?: ObjectAndUserUncheckedCreateWithoutOrganizationInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInputInput[];
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInputInput[];
    createMany?: UserCreateManyOrganizationInputEnvelopeInput;
    set?: WhereInput_29AndWhereInput_28;
    disconnect?: WhereInput_29AndWhereInput_28;
    delete?: WhereInput_29AndWhereInput_28;
    connect?: WhereInput_29AndWhereInput_28;
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInputInput[];
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInputInput[];
    deleteMany?: UserScalarWhereInputInput[];
};
export type UserUpsertWithWhereUniqueWithoutOrganizationInputInput = {
    where: WhereInput_27AndWhereInput_28;
    update: ObjectAndUserUncheckedUpdateWithoutOrganizationInputInput;
    create: ObjectAndUserUncheckedCreateWithoutOrganizationInputInput;
};
export type ObjectAndUserUncheckedUpdateWithoutOrganizationInputInput = {
    id?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
    posts?: PostUncheckedUpdateManyWithoutUserNestedInputInput;
    followers?: FollowUncheckedUpdateManyWithoutFollowedNestedInputInput;
    followings?: FollowUncheckedUpdateManyWithoutFollowerNestedInputInput;
    starredPosts?: StarUncheckedUpdateManyWithoutUserNestedInputInput;
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInputInput;
    relatedActivities?: ActivityUncheckedUpdateManyWithoutRelatedUserNestedInputInput;
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type UserUpdateWithWhereUniqueWithoutOrganizationInputInput = {
    where: WhereInput_27AndWhereInput_28;
    data: ObjectAndUserUncheckedUpdateWithoutOrganizationInputInput;
};
export type UserUpdateManyWithWhereWithoutOrganizationInputInput = {
    where: UserScalarWhereInputInput;
    data: ObjectAndUserUncheckedUpdateManyWithoutOrganizationInputInput;
};
export type UserScalarWhereInputInput = {
    AND?: UserScalarWhereInputInput[];
    OR?: UserScalarWhereInputInput[];
    NOT?: UserScalarWhereInputInput[];
    id?: t.String;
    organizationId?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
};
export type ObjectAndUserUncheckedUpdateManyWithoutOrganizationInputInput = {
    id?: t.String;
    bio?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: t.String;
};
export type OmitInput_1 = {
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    users?: UserListRelationFilterInput;
};
export type PostWhereInputInputAndWhereInput = {
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: StringAndCreatedAtInput;
    updatedAt?: t.String;
    privacy?: EnumPrivacyFilterInput;
    language?: EnumLanguageFilterInput_1;
    user?: WithoutInput_16AndUserWhereInputInput;
    stars?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    views?: PostViewListRelationFilterInput;
};
export type StringAndCreatedAtInput = {
    gte?: t.String;
    lte?: t.String;
};
export type OmitInput_2 = {
    id?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: LanguageInput;
    activities?: ActivityUncheckedCreateNestedManyWithoutPostInputInput;
    content?: t.String;
    summary?: t.String;
    title: t.String;
    views?: PostViewUncheckedCreateNestedManyWithoutPostInputInput;
    slug: t.String;
    avatarURL?: t.String;
    privacy?: PrivacyInput;
    stars?: StarUncheckedCreateNestedManyWithoutPostInputInput;
};
export type OmitInput_3 = {
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    language?: EnumLanguageFilterInput_1;
    activities?: ActivityListRelationFilterInput;
    content?: t.String;
    summary?: t.String;
    title?: t.String;
    views?: PostViewListRelationFilterInput;
    slug?: t.String;
    avatarURL?: t.String;
    privacy?: EnumPrivacyFilterInput;
    stars?: StarListRelationFilterInput;
};
export type FollowOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    followerId?: SortOrderInput;
    followedId?: SortOrderInput;
    createdAt?: SortOrderInput;
    follower?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    followed?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    _relevance?: FollowOrderByRelevanceInputInput;
};
export type FollowOrderByRelevanceInputInput = {
    fields: t.String;
    sort: SortOrderInput;
    search: t.String;
};
export type OmitInput_4 = {
    id?: t.String;
    createdAt?: t.String;
    follower?: UserCreateNestedOneWithoutFollowingsInputInput;
    followerId?: t.String;
};
export type WithoutInput_2AndFollowUncheckedUpdateInputInput = {
    follower?: UserUpdateOneRequiredWithoutFollowingsNestedInputInput;
    followed?: UserUpdateOneRequiredWithoutFollowersNestedInputInput;
    id?: t.String;
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
};
export type OmitInput_5 = {
    AND?: FollowWhereInputInput[];
    OR?: FollowWhereInputInput[];
    NOT?: FollowWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    follower?: WithoutInput_16AndUserWhereInputInput;
    followerId?: t.String;
    followerId_followedId?: FollowFollowerIdFollowedIdCompoundUniqueInputInput;
};
export type OmitInput_6 = {
    id?: t.String;
    createdAt?: t.String;
    followedId?: t.String;
    followed?: UserCreateNestedOneWithoutFollowersInputInput;
};
export type OmitInput_7 = {
    AND?: FollowWhereInputInput[];
    OR?: FollowWhereInputInput[];
    NOT?: FollowWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    followerId_followedId?: FollowFollowerIdFollowedIdCompoundUniqueInputInput;
    followedId?: t.String;
    followed?: WithoutInput_16AndUserWhereInputInput;
};
export type OmitInput_8 = {
    post?: PostCreateNestedOneWithoutStarsInputInput;
    id?: t.String;
    createdAt?: t.String;
    postId?: t.String;
};
export type OmitInput_9 = {
    post?: WithoutInput_18AndPostWhereInputInput;
    AND?: StarWhereInputInput[];
    OR?: StarWhereInputInput[];
    NOT?: StarWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    postId_userId?: StarPostIdUserIdCompoundUniqueInputInput;
};
export type OmitInput_10 = {
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    type: ActivityTypeInput;
    relatedUser?: UserCreateNestedOneWithoutRelatedActivitiesInputInput;
    relatedUserId?: t.String;
};
export type OmitInput_11 = {
    post?: WithoutInput_18AndPostWhereInputInput;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    type?: EnumActivityTypeFilterInput;
    relatedUser?: WithoutInput_20AndUserWhereInputInput;
    relatedUserId?: t.String;
};
export type OmitInput_12 = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    userId?: t.String;
    type: ActivityTypeInput;
};
export type OmitInput_13 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    userId?: t.String;
    type?: EnumActivityTypeFilterInput;
};
export type UserViewOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    userId?: SortOrderInput;
    viewedById?: SortOrderInput;
    createdAt?: SortOrderInput;
    user?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    viewedBy?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    _relevance?: UserViewOrderByRelevanceInputInput;
};
export type UserViewOrderByRelevanceInputInput = {
    fields: t.String;
    sort: SortOrderInput;
    search: t.String;
};
export type OmitInput_14 = {
    user?: UserCreateNestedOneWithoutPerformedUserViewsInputInput;
    id?: t.Number;
    createdAt?: t.String;
    userId?: t.String;
};
export type WithoutInput_8AndUserViewUncheckedUpdateInputInput = {
    user?: UserUpdateOneRequiredWithoutPerformedUserViewsNestedInputInput;
    viewedBy?: UserUpdateOneRequiredWithoutReceivedUserViewsNestedInputInput;
    id?: t.Number;
    userId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type OmitInput_15 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    AND?: UserViewWhereInputInput[];
    OR?: UserViewWhereInputInput[];
    NOT?: UserViewWhereInputInput[];
    id?: t.Number;
    createdAt?: t.String;
    userId?: t.String;
};
export type OmitInput_16 = {
    id?: t.Number;
    createdAt?: t.String;
    viewedBy?: UserCreateNestedOneWithoutReceivedUserViewsInputInput;
    viewedById?: t.String;
};
export type OmitInput_17 = {
    AND?: UserViewWhereInputInput[];
    OR?: UserViewWhereInputInput[];
    NOT?: UserViewWhereInputInput[];
    id?: t.Number;
    createdAt?: t.String;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
    viewedById?: t.String;
};
export type OmitInput_18 = {
    post?: PostCreateNestedOneWithoutViewsInputInput;
    id?: t.Number;
    createdAt?: t.String;
    postId?: t.String;
};
export type OmitInput_19 = {
    post?: WithoutInput_22AndPostWhereInputInput;
    AND?: PostViewWhereInputInput[];
    OR?: PostViewWhereInputInput[];
    NOT?: PostViewWhereInputInput[];
    id?: t.Number;
    createdAt?: t.String;
    postId?: t.String;
};
export type PostWhereInputInputAndWhereInputAndWhereInput_1 = {
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: StringAndCreatedAtInputAndCreatedAtInput_1;
    updatedAt?: t.String;
    privacy?: EnumPrivacyFilterInput;
    language?: EnumLanguageFilterInput_1;
    user?: WithoutInput_16AndUserWhereInputInput;
    stars?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    views?: PostViewListRelationFilterInput;
};
export type StringAndCreatedAtInputAndCreatedAtInput_1 = {
    gte?: t.String;
    lte?: t.String;
};
export type PostWhereInputInputAndWhereInputAndWhereInput_2 = {
    AND?: PostWhereInputInput[];
    OR?: PostWhereInputInput[];
    NOT?: PostWhereInputInput[];
    id?: t.String;
    slug?: t.String;
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    userId?: t.String;
    createdAt?: StringAndCreatedAtInputAndCreatedAtInput_2;
    updatedAt?: t.String;
    privacy?: EnumPrivacyFilterInput;
    language?: EnumLanguageFilterInput_1;
    user?: WithoutInput_16AndUserWhereInputInput;
    stars?: StarListRelationFilterInput;
    activities?: ActivityListRelationFilterInput;
    views?: PostViewListRelationFilterInput;
};
export type StringAndCreatedAtInputAndCreatedAtInput_2 = {
    gte?: t.String;
    lte?: t.String;
};
export type ValuesInput = {
    language?: LanguageInput;
    bio?: t.String;
};
export type ValuesInput_1 = {
    title: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    privacy?: PrivacyInput;
    language?: LanguageInput;
};
export type ValuesInput_2 = {
    title?: t.String;
    avatarURL?: t.String;
    summary?: t.String;
    content?: t.String;
    privacy?: PrivacyInput;
    language?: LanguageInput;
};

export class Query {
    __typename: t.String;
    search: (args: {
        query: t.String;
    }) => Search;
    me: User;
    user: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    userByUserName: (args: {
        userName: t.String;
    }) => User;
    allUser: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection;
    post: (args?: {
        where?: PostWhereInputInput;
        orderBy?: PostOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Post;
    allPost: (args?: {
        query?: t.String;
        pagination?: ConnectionArgumentsInput;
        where?: PostWhereInputInputAndWhereInputAndWhereInput_1;
        orderBy?: PostOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_1;
    allTrendingPost: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: PostWhereInputInputAndWhereInputAndWhereInput_2;
    }) => Connection_1;
    version: t.String;
    constructor() { this.__typename = ""; this.search = fnProxy(Search); this.me = proxy(User); this.user = fnProxy(User); this.userByUserName = fnProxy(User); this.allUser = fnProxy(Connection); this.post = fnProxy(Post); this.allPost = fnProxy(Connection_1); this.allTrendingPost = fnProxy(Connection_1); this.version = ""; }
}
export class Search {
    __typename: t.String;
    users: t.Nullable<Connection>;
    posts: t.Nullable<Connection_1>;
    constructor() { this.__typename = ""; this.users = proxy(Connection); this.posts = proxy(Connection_1); }
}
export class Connection {
    __typename: t.String;
    nodes: User[];
    edges: Edge[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(User); this.edges = arrayProxy(Edge); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class User {
    __typename: t.String;
    profile: Profile;
    featuredPosts: Connection_1;
    isFollowed: t.Boolean;
    id: t.String;
    organization: (args?: {
        where?: OrganizationWhereInputInput;
        orderBy?: OrganizationOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Organization;
    posts: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: PostWhereInputInputAndWhereInput;
        orderBy?: PostOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_1;
    post: (args?: {
        where?: PostWhereInputInput;
    }) => Post;
    followers: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: FollowWhereInputInput;
        orderBy?: FollowOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_2;
    follower: (args?: {
        where?: FollowWhereInputInput;
    }) => Follow;
    followings: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: FollowWhereInputInput;
        orderBy?: FollowOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_2;
    following: (args?: {
        where?: FollowWhereInputInput;
    }) => Follow;
    starredPosts: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: StarWhereInputInput;
        orderBy?: StarOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_3;
    starredPost: (args?: {
        where?: StarWhereInputInput;
    }) => Star;
    bio: t.Nullable<t.String>;
    createdAt: t.Date;
    updatedAt: t.Date;
    activities: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: ActivityWhereInputInput;
        orderBy?: ActivityOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_4;
    activitie: (args?: {
        where?: ActivityWhereInputInput;
    }) => Activity;
    relatedActivities: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: ActivityWhereInputInput;
        orderBy?: ActivityOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_4;
    relatedActivitie: (args?: {
        where?: ActivityWhereInputInput;
    }) => Activity;
    language: t.Nullable<Language>;
    receivedUserViews: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: UserViewWhereInputInput;
        orderBy?: UserViewOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_5;
    receivedUserView: (args?: {
        where?: UserViewWhereInputInput;
    }) => UserView;
    performedUserViews: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: UserViewWhereInputInput;
        orderBy?: UserViewOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_5;
    performedUserView: (args?: {
        where?: UserViewWhereInputInput;
    }) => UserView;
    performedPostViews: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: PostViewWhereInputInput;
        orderBy?: PostViewOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_6;
    performedPostView: (args?: {
        where?: PostViewWhereInputInput;
    }) => PostView;
    constructor() { this.__typename = ""; this.profile = proxy(Profile); this.featuredPosts = proxy(Connection_1); this.isFollowed = false; this.id = ""; this.organization = fnProxy(Organization); this.posts = fnProxy(Connection_1); this.post = fnProxy(Post); this.followers = fnProxy(Connection_2); this.follower = fnProxy(Follow); this.followings = fnProxy(Connection_2); this.following = fnProxy(Follow); this.starredPosts = fnProxy(Connection_3); this.starredPost = fnProxy(Star); this.bio = null; this.createdAt = ""; this.updatedAt = ""; this.activities = fnProxy(Connection_4); this.activitie = fnProxy(Activity); this.relatedActivities = fnProxy(Connection_4); this.relatedActivitie = fnProxy(Activity); this.language = null; this.receivedUserViews = fnProxy(Connection_5); this.receivedUserView = fnProxy(UserView); this.performedUserViews = fnProxy(Connection_5); this.performedUserView = fnProxy(UserView); this.performedPostViews = fnProxy(Connection_6); this.performedPostView = fnProxy(PostView); }
}
export class Profile {
    __typename: t.String;
    state: t.Nullable<USER_STATE_UNSPECIFIED_USER_STATE_ACTIVE_USER_STATE_INACTIVE_USER_STATE_DELETED_USER_STATE_LOCKED_USER_STATE_SUSPEND_USER_STATE_INITIAL>;
    userName: t.String;
    firstName: t.String;
    lastName: t.String;
    nickName: t.Nullable<t.String>;
    displayName: t.String;
    preferredLanguage: t.String;
    email: t.String;
    avatarUrl: t.Nullable<t.String>;
    constructor() { this.__typename = ""; this.state = null; this.userName = ""; this.firstName = ""; this.lastName = ""; this.nickName = null; this.displayName = ""; this.preferredLanguage = ""; this.email = ""; this.avatarUrl = null; }
}
export class Connection_1 {
    __typename: t.String;
    nodes: Post[];
    edges: Edge_1[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(Post); this.edges = arrayProxy(Edge_1); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class Post {
    __typename: t.String;
    matchingQuery: (args: {
        query: t.String;
    }) => t.Nullable<t.String>;
    hasStarred: t.Nullable<t.Boolean>;
    isOwner: t.Boolean;
    id: t.String;
    slug: t.String;
    title: t.String;
    avatarURL: t.Nullable<t.String>;
    summary: t.Nullable<t.String>;
    content: t.Nullable<t.String>;
    user: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    stars: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: StarWhereInputInput;
        orderBy?: StarOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_3;
    star: (args?: {
        where?: StarWhereInputInput;
    }) => Star;
    createdAt: t.Date;
    updatedAt: t.Date;
    privacy: t.Nullable<Privacy>;
    activities: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: ActivityWhereInputInput;
        orderBy?: ActivityOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_4;
    activitie: (args?: {
        where?: ActivityWhereInputInput;
    }) => Activity;
    views: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: PostViewWhereInputInput;
        orderBy?: PostViewOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_6;
    view: (args?: {
        where?: PostViewWhereInputInput;
    }) => PostView;
    language: t.Nullable<Language>;
    constructor() { this.__typename = ""; this.matchingQuery = () => null; this.hasStarred = null; this.isOwner = false; this.id = ""; this.slug = ""; this.title = ""; this.avatarURL = null; this.summary = null; this.content = null; this.user = fnProxy(User); this.stars = fnProxy(Connection_3); this.star = fnProxy(Star); this.createdAt = ""; this.updatedAt = ""; this.privacy = null; this.activities = fnProxy(Connection_4); this.activitie = fnProxy(Activity); this.views = fnProxy(Connection_6); this.view = fnProxy(PostView); this.language = null; }
}
export class Connection_3 {
    __typename: t.String;
    nodes: Star[];
    edges: Edge_2[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(Star); this.edges = arrayProxy(Edge_2); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class Star {
    __typename: t.String;
    id: t.String;
    user: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    post: (args?: {
        where?: PostWhereInputInput;
        orderBy?: PostOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => t.Nullable<Post>;
    createdAt: t.Date;
    constructor() { this.__typename = ""; this.id = ""; this.user = fnProxy(User); this.post = fnProxy(Post); this.createdAt = ""; }
}
export class Edge_2 {
    __typename: t.String;
    cursor: t.String;
    node: Star;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(Star); }
}
export class PageInfo {
    __typename: t.String;
    hasNextPage: t.Boolean;
    hasPreviousPage: t.Boolean;
    startCursor: t.Nullable<t.String>;
    endCursor: t.Nullable<t.String>;
    constructor() { this.__typename = ""; this.hasNextPage = false; this.hasPreviousPage = false; this.startCursor = null; this.endCursor = null; }
}
export class Connection_4 {
    __typename: t.String;
    nodes: Activity[];
    edges: Edge_3[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(Activity); this.edges = arrayProxy(Edge_3); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class Activity {
    __typename: t.String;
    id: t.String;
    type: t.Nullable<ActivityType>;
    createdAt: t.Date;
    user: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    post: (args?: {
        where?: PostWhereInputInput;
        orderBy?: PostOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => t.Nullable<Post>;
    relatedUser: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => t.Nullable<User>;
    constructor() { this.__typename = ""; this.id = ""; this.type = null; this.createdAt = ""; this.user = fnProxy(User); this.post = fnProxy(Post); this.relatedUser = fnProxy(User); }
}
export class Edge_3 {
    __typename: t.String;
    cursor: t.String;
    node: Activity;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(Activity); }
}
export class Connection_6 {
    __typename: t.String;
    nodes: PostView[];
    edges: Edge_4[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(PostView); this.edges = arrayProxy(Edge_4); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class PostView {
    __typename: t.String;
    id: t.Number;
    post: (args?: {
        where?: PostWhereInputInput;
        orderBy?: PostOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Post;
    viewedBy: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    createdAt: t.Date;
    constructor() { this.__typename = ""; this.id = null; this.post = fnProxy(Post); this.viewedBy = fnProxy(User); this.createdAt = ""; }
}
export class Edge_4 {
    __typename: t.String;
    cursor: t.String;
    node: PostView;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(PostView); }
}
export class Edge_1 {
    __typename: t.String;
    cursor: t.String;
    node: Post;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(Post); }
}
export class Organization {
    __typename: t.String;
    id: t.String;
    users: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection;
    user: (args?: {
        where?: UserWhereInputInput;
    }) => User;
    constructor() { this.__typename = ""; this.id = ""; this.users = fnProxy(Connection); this.user = fnProxy(User); }
}
export class Connection_2 {
    __typename: t.String;
    nodes: Follow[];
    edges: Edge_5[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(Follow); this.edges = arrayProxy(Edge_5); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class Follow {
    __typename: t.String;
    id: t.String;
    follower: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    followed: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    createdAt: t.Date;
    constructor() { this.__typename = ""; this.id = ""; this.follower = fnProxy(User); this.followed = fnProxy(User); this.createdAt = ""; }
}
export class Edge_5 {
    __typename: t.String;
    cursor: t.String;
    node: Follow;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(Follow); }
}
export class Connection_5 {
    __typename: t.String;
    nodes: UserView[];
    edges: Edge_6[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(UserView); this.edges = arrayProxy(Edge_6); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class UserView {
    __typename: t.String;
    id: t.Number;
    user: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    viewedBy: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    createdAt: t.Date;
    constructor() { this.__typename = ""; this.id = null; this.user = fnProxy(User); this.viewedBy = fnProxy(User); this.createdAt = ""; }
}
export class Edge_6 {
    __typename: t.String;
    cursor: t.String;
    node: UserView;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(UserView); }
}
export class Edge {
    __typename: t.String;
    cursor: t.String;
    node: User;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(User); }
}
export class Mutation {
    __typename: t.String;
    userUpdate: (args: {
        id: t.String;
        values: ValuesInput;
    }) => User;
    userFollow: (args: {
        followedId: t.String;
    }) => Follow;
    userUnfollow: (args: {
        followedId: t.String;
    }) => Follow;
    postCreate: (args: {
        values: ValuesInput_1;
    }) => Post;
    postUpdate: (args: {
        id: t.String;
        values: ValuesInput_2;
    }) => Post;
    postDelete: (args: {
        id: t.String;
    }) => Post;
    postStar: (args: {
        postId: t.String;
    }) => Star;
    postUnstar: (args: {
        postId: t.String;
    }) => Star;
    constructor() { this.__typename = ""; this.userUpdate = fnProxy(User); this.userFollow = fnProxy(Follow); this.userUnfollow = fnProxy(Follow); this.postCreate = fnProxy(Post); this.postUpdate = fnProxy(Post); this.postDelete = fnProxy(Post); this.postStar = fnProxy(Star); this.postUnstar = fnProxy(Star); }
}

