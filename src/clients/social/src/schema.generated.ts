
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
export enum PrivacyInput {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    FRIENDS = "FRIENDS"
}
export enum LanguageInput {
    EN = "EN",
    DE = "DE"
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
export enum FollowOrderByRelevanceFieldEnumInput {
    id = "id",
    followerId = "followerId",
    followedId = "followedId"
}
export enum ActivityOrderByRelevanceFieldEnumInput {
    id = "id",
    postId = "postId",
    userId = "userId",
    type = "type",
    starId = "starId",
    followId = "followId"
}
export enum PostViewOrderByRelevanceFieldEnumInput {
    postId = "postId",
    viewedById = "viewedById"
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
    activities?: ActivityListRelationFilterInput;
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
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    starId?: t.String;
    followId?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    star?: WithoutInput_20AndStarWhereInputInput;
    follow?: WithoutInput_22AndFollowWhereInputInput;
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
    activities?: ActivityListRelationFilterInput;
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
    post?: WithoutInput_24AndPostWhereInputInput;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
};
export type WithoutInput_24AndPostWhereInputInput = {
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
export type WithoutInput_20AndStarWhereInputInput = {
    is?: StarWhereInputInput;
    isNot?: StarWhereInputInput;
    AND?: StarWhereInputInput[];
    OR?: StarWhereInputInput[];
    NOT?: StarWhereInputInput[];
    id?: t.String;
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    activities?: ActivityListRelationFilterInput;
};
export type WithoutInput_22AndFollowWhereInputInput = {
    is?: FollowWhereInputInput;
    isNot?: FollowWhereInputInput;
    AND?: FollowWhereInputInput[];
    OR?: FollowWhereInputInput[];
    NOT?: FollowWhereInputInput[];
    id?: t.String;
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
    follower?: WithoutInput_16AndUserWhereInputInput;
    followed?: WithoutInput_16AndUserWhereInputInput;
    activities?: ActivityListRelationFilterInput;
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
export type OmitInput_18 = {
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
    create?: WithoutInput_26AndStarUncheckedCreateWithoutPostInputInput;
    connectOrCreate?: StarCreateOrConnectWithoutPostInputInput[];
    createMany?: StarCreateManyPostInputEnvelopeInput;
    connect?: WhereInput_16AndWhereInput_15;
};
export type WithoutInput_26AndStarUncheckedCreateWithoutPostInputInput = {
    user?: UserCreateNestedOneWithoutStarredPostsInputInput;
    id?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutStarInputInput;
};
export type UserCreateNestedOneWithoutStarredPostsInputInput = {
    create?: WithoutInput_28AndUserUncheckedCreateWithoutStarredPostsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutStarredPostsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_28AndUserUncheckedCreateWithoutStarredPostsInputInput = {
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
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type FollowUncheckedCreateNestedManyWithoutFollowedInputInput = {
    create?: WithoutInput_30AndFollowUncheckedCreateWithoutFollowedInputInput;
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedInputInput[];
    createMany?: FollowCreateManyFollowedInputEnvelopeInput;
    connect?: WhereInput_12AndWhereInput_11;
};
export type WithoutInput_30AndFollowUncheckedCreateWithoutFollowedInputInput = {
    follower?: UserCreateNestedOneWithoutFollowingsInputInput;
    id?: t.String;
    followerId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutFollowInputInput;
};
export type UserCreateNestedOneWithoutFollowingsInputInput = {
    create?: WithoutInput_32AndUserUncheckedCreateWithoutFollowingsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutFollowingsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_32AndUserUncheckedCreateWithoutFollowingsInputInput = {
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
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type StarUncheckedCreateNestedManyWithoutUserInputInput = {
    create?: WithoutInput_34AndStarUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: StarCreateOrConnectWithoutUserInputInput[];
    createMany?: StarCreateManyUserInputEnvelopeInput;
    connect?: WhereInput_16AndWhereInput_15;
};
export type WithoutInput_34AndStarUncheckedCreateWithoutUserInputInput = {
    post?: PostCreateNestedOneWithoutStarsInputInput;
    id?: t.String;
    postId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutStarInputInput;
};
export type PostCreateNestedOneWithoutStarsInputInput = {
    create?: WithoutInput_36AndPostUncheckedCreateWithoutStarsInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutStarsInputInput;
    connect?: WhereInput_6AndWhereInput_7;
};
export type WithoutInput_36AndPostUncheckedCreateWithoutStarsInputInput = {
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
    create?: WithoutInput_38AndUserUncheckedCreateWithoutPostsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPostsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_38AndUserUncheckedCreateWithoutPostsInputInput = {
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
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type FollowUncheckedCreateNestedManyWithoutFollowerInputInput = {
    create?: WithoutInput_40AndFollowUncheckedCreateWithoutFollowerInputInput;
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInputInput[];
    createMany?: FollowCreateManyFollowerInputEnvelopeInput;
    connect?: WhereInput_12AndWhereInput_11;
};
export type WithoutInput_40AndFollowUncheckedCreateWithoutFollowerInputInput = {
    followed?: UserCreateNestedOneWithoutFollowersInputInput;
    id?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutFollowInputInput;
};
export type UserCreateNestedOneWithoutFollowersInputInput = {
    create?: WithoutInput_42AndUserUncheckedCreateWithoutFollowersInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_42AndUserUncheckedCreateWithoutFollowersInputInput = {
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
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type ActivityUncheckedCreateNestedManyWithoutUserInputInput = {
    create?: WithoutInput_44AndActivityUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInputInput[];
    createMany?: ActivityCreateManyUserInputEnvelopeInput;
    connect?: WhereInput_20AndWhereInput_19;
};
export type WithoutInput_44AndActivityUncheckedCreateWithoutUserInputInput = {
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    star?: StarCreateNestedOneWithoutActivitiesInputInput;
    follow?: FollowCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    type: t.String;
    createdAt?: t.String;
    postId?: t.String;
    starId?: t.String;
    followId?: t.String;
};
export type PostCreateNestedOneWithoutActivitiesInputInput = {
    create?: WithoutInput_46AndPostUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutActivitiesInputInput;
    connect?: WhereInput_6AndWhereInput_7;
};
export type WithoutInput_46AndPostUncheckedCreateWithoutActivitiesInputInput = {
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
    create?: WithoutInput_48AndPostViewUncheckedCreateWithoutPostInputInput;
    connectOrCreate?: PostViewCreateOrConnectWithoutPostInputInput[];
    createMany?: PostViewCreateManyPostInputEnvelopeInput;
    connect?: WhereInput_26AndWhereInput_25;
};
export type WithoutInput_48AndPostViewUncheckedCreateWithoutPostInputInput = {
    viewedBy?: UserCreateNestedOneWithoutPerformedPostViewsInputInput;
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type UserCreateNestedOneWithoutPerformedPostViewsInputInput = {
    create?: WithoutInput_50AndUserUncheckedCreateWithoutPerformedPostViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPerformedPostViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_50AndUserUncheckedCreateWithoutPerformedPostViewsInputInput = {
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
};
export type UserViewUncheckedCreateNestedManyWithoutViewedByInputInput = {
    create?: WithoutInput_52AndUserViewUncheckedCreateWithoutViewedByInputInput;
    connectOrCreate?: UserViewCreateOrConnectWithoutViewedByInputInput[];
    createMany?: UserViewCreateManyViewedByInputEnvelopeInput;
    connect?: WhereInput_23AndWhereInput_22;
};
export type WithoutInput_52AndUserViewUncheckedCreateWithoutViewedByInputInput = {
    user?: UserCreateNestedOneWithoutPerformedUserViewsInputInput;
    id?: t.Number;
    userId?: t.String;
    createdAt?: t.String;
};
export type UserCreateNestedOneWithoutPerformedUserViewsInputInput = {
    create?: WithoutInput_54AndUserUncheckedCreateWithoutPerformedUserViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPerformedUserViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_54AndUserUncheckedCreateWithoutPerformedUserViewsInputInput = {
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
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type PostViewUncheckedCreateNestedManyWithoutViewedByInputInput = {
    create?: WithoutInput_56AndPostViewUncheckedCreateWithoutViewedByInputInput;
    connectOrCreate?: PostViewCreateOrConnectWithoutViewedByInputInput[];
    createMany?: PostViewCreateManyViewedByInputEnvelopeInput;
    connect?: WhereInput_26AndWhereInput_25;
};
export type WithoutInput_56AndPostViewUncheckedCreateWithoutViewedByInputInput = {
    post?: PostCreateNestedOneWithoutViewsInputInput;
    id?: t.Number;
    postId?: t.String;
    createdAt?: t.String;
};
export type PostCreateNestedOneWithoutViewsInputInput = {
    create?: WithoutInput_58AndPostUncheckedCreateWithoutViewsInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutViewsInputInput;
    connect?: WhereInput_6AndWhereInput_7;
};
export type WithoutInput_58AndPostUncheckedCreateWithoutViewsInputInput = {
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
    create?: WithoutInput_60AndActivityUncheckedCreateWithoutPostInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutPostInputInput[];
    createMany?: ActivityCreateManyPostInputEnvelopeInput;
    connect?: WhereInput_20AndWhereInput_19;
};
export type WithoutInput_60AndActivityUncheckedCreateWithoutPostInputInput = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    star?: StarCreateNestedOneWithoutActivitiesInputInput;
    follow?: FollowCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    type: t.String;
    createdAt?: t.String;
    userId?: t.String;
    starId?: t.String;
    followId?: t.String;
};
export type UserCreateNestedOneWithoutActivitiesInputInput = {
    create?: WithoutInput_62AndUserUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_62AndUserUncheckedCreateWithoutActivitiesInputInput = {
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
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type UserViewUncheckedCreateNestedManyWithoutUserInputInput = {
    create?: WithoutInput_64AndUserViewUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: UserViewCreateOrConnectWithoutUserInputInput[];
    createMany?: UserViewCreateManyUserInputEnvelopeInput;
    connect?: WhereInput_23AndWhereInput_22;
};
export type WithoutInput_64AndUserViewUncheckedCreateWithoutUserInputInput = {
    viewedBy?: UserCreateNestedOneWithoutReceivedUserViewsInputInput;
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type UserCreateNestedOneWithoutReceivedUserViewsInputInput = {
    create?: WithoutInput_66AndUserUncheckedCreateWithoutReceivedUserViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutReceivedUserViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
};
export type WithoutInput_66AndUserUncheckedCreateWithoutReceivedUserViewsInputInput = {
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
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type UserCreateOrConnectWithoutReceivedUserViewsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_66AndUserUncheckedCreateWithoutReceivedUserViewsInputInput;
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
    receivedUserViews?: UserViewListRelationFilterInput;
    performedUserViews?: UserViewListRelationFilterInput;
    performedPostViews?: PostViewListRelationFilterInput;
};
export type UserViewCreateOrConnectWithoutUserInputInput = {
    where: WhereInput_21AndWhereInput_22;
    create: WithoutInput_64AndUserViewUncheckedCreateWithoutUserInputInput;
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
export type UserCreateOrConnectWithoutActivitiesInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_62AndUserUncheckedCreateWithoutActivitiesInputInput;
};
export type StarCreateNestedOneWithoutActivitiesInputInput = {
    create?: WithoutInput_68AndStarUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: StarCreateOrConnectWithoutActivitiesInputInput;
    connect?: WhereInput_14AndWhereInput_15;
};
export type WithoutInput_68AndStarUncheckedCreateWithoutActivitiesInputInput = {
    user?: UserCreateNestedOneWithoutStarredPostsInputInput;
    post?: PostCreateNestedOneWithoutStarsInputInput;
    id?: t.String;
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
};
export type StarCreateOrConnectWithoutActivitiesInputInput = {
    where: WhereInput_14AndWhereInput_15;
    create: WithoutInput_68AndStarUncheckedCreateWithoutActivitiesInputInput;
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
    activities?: ActivityListRelationFilterInput;
};
export type StarPostIdUserIdCompoundUniqueInputInput = {
    postId: t.String;
    userId: t.String;
};
export type FollowCreateNestedOneWithoutActivitiesInputInput = {
    create?: WithoutInput_70AndFollowUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: FollowCreateOrConnectWithoutActivitiesInputInput;
    connect?: WhereInput_10AndWhereInput_11;
};
export type WithoutInput_70AndFollowUncheckedCreateWithoutActivitiesInputInput = {
    follower?: UserCreateNestedOneWithoutFollowingsInputInput;
    followed?: UserCreateNestedOneWithoutFollowersInputInput;
    id?: t.String;
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
};
export type FollowCreateOrConnectWithoutActivitiesInputInput = {
    where: WhereInput_10AndWhereInput_11;
    create: WithoutInput_70AndFollowUncheckedCreateWithoutActivitiesInputInput;
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
    activities?: ActivityListRelationFilterInput;
};
export type FollowFollowerIdFollowedIdCompoundUniqueInputInput = {
    followerId: t.String;
    followedId: t.String;
};
export type ActivityCreateOrConnectWithoutPostInputInput = {
    where: WhereInput_18AndWhereInput_19;
    create: WithoutInput_60AndActivityUncheckedCreateWithoutPostInputInput;
};
export type WhereInput_18AndWhereInput_19 = {
    id?: t.String;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    starId?: t.String;
    followId?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    star?: WithoutInput_20AndStarWhereInputInput;
    follow?: WithoutInput_22AndFollowWhereInputInput;
};
export type ActivityCreateManyPostInputEnvelopeInput = {
    data?: ActivityCreateManyPostInputInput[];
    skipDuplicates?: t.Boolean;
};
export type ActivityCreateManyPostInputInput = {
    id?: t.String;
    type: t.String;
    createdAt?: t.String;
    userId: t.String;
    starId?: t.String;
    followId?: t.String;
};
export type WhereInput_20AndWhereInput_19 = {
    id?: t.String;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    starId?: t.String;
    followId?: t.String;
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    star?: WithoutInput_20AndStarWhereInputInput;
    follow?: WithoutInput_22AndFollowWhereInputInput;
};
export type PostCreateOrConnectWithoutViewsInputInput = {
    where: WhereInput_6AndWhereInput_7;
    create: WithoutInput_58AndPostUncheckedCreateWithoutViewsInputInput;
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
    create: WithoutInput_56AndPostViewUncheckedCreateWithoutViewedByInputInput;
};
export type WhereInput_24AndWhereInput_25 = {
    id?: t.Number;
    AND?: PostViewWhereInputInput[];
    OR?: PostViewWhereInputInput[];
    NOT?: PostViewWhereInputInput[];
    postId?: t.String;
    viewedById?: t.String;
    createdAt?: t.String;
    post?: WithoutInput_24AndPostWhereInputInput;
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
    post?: WithoutInput_24AndPostWhereInputInput;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
};
export type UserCreateOrConnectWithoutPerformedUserViewsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_54AndUserUncheckedCreateWithoutPerformedUserViewsInputInput;
};
export type UserViewCreateOrConnectWithoutViewedByInputInput = {
    where: WhereInput_21AndWhereInput_22;
    create: WithoutInput_52AndUserViewUncheckedCreateWithoutViewedByInputInput;
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
export type UserCreateOrConnectWithoutPerformedPostViewsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_50AndUserUncheckedCreateWithoutPerformedPostViewsInputInput;
};
export type PostViewCreateOrConnectWithoutPostInputInput = {
    where: WhereInput_24AndWhereInput_25;
    create: WithoutInput_48AndPostViewUncheckedCreateWithoutPostInputInput;
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
    create: WithoutInput_46AndPostUncheckedCreateWithoutActivitiesInputInput;
};
export type ActivityCreateOrConnectWithoutUserInputInput = {
    where: WhereInput_18AndWhereInput_19;
    create: WithoutInput_44AndActivityUncheckedCreateWithoutUserInputInput;
};
export type ActivityCreateManyUserInputEnvelopeInput = {
    data?: ActivityCreateManyUserInputInput[];
    skipDuplicates?: t.Boolean;
};
export type ActivityCreateManyUserInputInput = {
    id?: t.String;
    type: t.String;
    createdAt?: t.String;
    postId?: t.String;
    starId?: t.String;
    followId?: t.String;
};
export type UserCreateOrConnectWithoutFollowersInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_42AndUserUncheckedCreateWithoutFollowersInputInput;
};
export type ActivityUncheckedCreateNestedManyWithoutFollowInputInput = {
    create?: WithoutInput_72AndActivityUncheckedCreateWithoutFollowInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutFollowInputInput[];
    createMany?: ActivityCreateManyFollowInputEnvelopeInput;
    connect?: WhereInput_20AndWhereInput_19;
};
export type WithoutInput_72AndActivityUncheckedCreateWithoutFollowInputInput = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    star?: StarCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    type: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    starId?: t.String;
};
export type ActivityCreateOrConnectWithoutFollowInputInput = {
    where: WhereInput_18AndWhereInput_19;
    create: WithoutInput_72AndActivityUncheckedCreateWithoutFollowInputInput;
};
export type ActivityCreateManyFollowInputEnvelopeInput = {
    data?: ActivityCreateManyFollowInputInput[];
    skipDuplicates?: t.Boolean;
};
export type ActivityCreateManyFollowInputInput = {
    id?: t.String;
    type: t.String;
    createdAt?: t.String;
    userId: t.String;
    postId?: t.String;
    starId?: t.String;
};
export type FollowCreateOrConnectWithoutFollowerInputInput = {
    where: WhereInput_10AndWhereInput_11;
    create: WithoutInput_40AndFollowUncheckedCreateWithoutFollowerInputInput;
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
    activities?: ActivityListRelationFilterInput;
};
export type UserCreateOrConnectWithoutPostsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_38AndUserUncheckedCreateWithoutPostsInputInput;
};
export type PostCreateOrConnectWithoutStarsInputInput = {
    where: WhereInput_6AndWhereInput_7;
    create: WithoutInput_36AndPostUncheckedCreateWithoutStarsInputInput;
};
export type ActivityUncheckedCreateNestedManyWithoutStarInputInput = {
    create?: WithoutInput_74AndActivityUncheckedCreateWithoutStarInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutStarInputInput[];
    createMany?: ActivityCreateManyStarInputEnvelopeInput;
    connect?: WhereInput_20AndWhereInput_19;
};
export type WithoutInput_74AndActivityUncheckedCreateWithoutStarInputInput = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    follow?: FollowCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    type: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    followId?: t.String;
};
export type ActivityCreateOrConnectWithoutStarInputInput = {
    where: WhereInput_18AndWhereInput_19;
    create: WithoutInput_74AndActivityUncheckedCreateWithoutStarInputInput;
};
export type ActivityCreateManyStarInputEnvelopeInput = {
    data?: ActivityCreateManyStarInputInput[];
    skipDuplicates?: t.Boolean;
};
export type ActivityCreateManyStarInputInput = {
    id?: t.String;
    type: t.String;
    createdAt?: t.String;
    userId: t.String;
    postId?: t.String;
    followId?: t.String;
};
export type StarCreateOrConnectWithoutUserInputInput = {
    where: WhereInput_14AndWhereInput_15;
    create: WithoutInput_34AndStarUncheckedCreateWithoutUserInputInput;
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
    activities?: ActivityListRelationFilterInput;
};
export type UserCreateOrConnectWithoutFollowingsInputInput = {
    where: WhereInput_27AndWhereInput_28;
    create: WithoutInput_32AndUserUncheckedCreateWithoutFollowingsInputInput;
};
export type FollowCreateOrConnectWithoutFollowedInputInput = {
    where: WhereInput_10AndWhereInput_11;
    create: WithoutInput_30AndFollowUncheckedCreateWithoutFollowedInputInput;
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
    create: WithoutInput_28AndUserUncheckedCreateWithoutStarredPostsInputInput;
};
export type StarCreateOrConnectWithoutPostInputInput = {
    where: WhereInput_14AndWhereInput_15;
    create: WithoutInput_26AndStarUncheckedCreateWithoutPostInputInput;
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type OrganizationUpdateOneRequiredWithoutUsersNestedInputInput = {
    create?: ObjectAndOrganizationUncheckedCreateWithoutUsersInputInput;
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInputInput;
    upsert?: OrganizationUpsertWithoutUsersInputInput;
    connect?: WhereInput_3AndWhereInput_4;
    update?: WithoutInput_76AndOrganizationUncheckedUpdateWithoutUsersInputInput;
};
export type OrganizationUpsertWithoutUsersInputInput = {
    update: ObjectAndOrganizationUncheckedUpdateWithoutUsersInputInput;
    create: ObjectAndOrganizationUncheckedCreateWithoutUsersInputInput;
    where?: OrganizationWhereInputInput;
};
export type ObjectAndOrganizationUncheckedUpdateWithoutUsersInputInput = {
    id?: t.String;
};
export type WithoutInput_76AndOrganizationUncheckedUpdateWithoutUsersInputInput = {
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
    create?: WithoutInput_26AndStarUncheckedCreateWithoutPostInputInput;
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
    update: WithoutInput_80AndStarUncheckedUpdateWithoutPostInputInput;
    create: WithoutInput_26AndStarUncheckedCreateWithoutPostInputInput;
};
export type WithoutInput_80AndStarUncheckedUpdateWithoutPostInputInput = {
    user?: UserUpdateOneRequiredWithoutStarredPostsNestedInputInput;
    id?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedUpdateManyWithoutStarNestedInputInput;
};
export type UserUpdateOneRequiredWithoutStarredPostsNestedInputInput = {
    create?: WithoutInput_28AndUserUncheckedCreateWithoutStarredPostsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutStarredPostsInputInput;
    upsert?: UserUpsertWithoutStarredPostsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_82AndUserUncheckedUpdateWithoutStarredPostsInputInput;
};
export type UserUpsertWithoutStarredPostsInputInput = {
    update: WithoutInput_88AndUserUncheckedUpdateWithoutStarredPostsInputInput;
    create: WithoutInput_28AndUserUncheckedCreateWithoutStarredPostsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_88AndUserUncheckedUpdateWithoutStarredPostsInputInput = {
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type FollowUncheckedUpdateManyWithoutFollowedNestedInputInput = {
    create?: WithoutInput_30AndFollowUncheckedCreateWithoutFollowedInputInput;
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
    update: WithoutInput_90AndFollowUncheckedUpdateWithoutFollowedInputInput;
    create: WithoutInput_30AndFollowUncheckedCreateWithoutFollowedInputInput;
};
export type WithoutInput_90AndFollowUncheckedUpdateWithoutFollowedInputInput = {
    follower?: UserUpdateOneRequiredWithoutFollowingsNestedInputInput;
    id?: t.String;
    followerId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedUpdateManyWithoutFollowNestedInputInput;
};
export type UserUpdateOneRequiredWithoutFollowingsNestedInputInput = {
    create?: WithoutInput_32AndUserUncheckedCreateWithoutFollowingsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutFollowingsInputInput;
    upsert?: UserUpsertWithoutFollowingsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_92AndUserUncheckedUpdateWithoutFollowingsInputInput;
};
export type UserUpsertWithoutFollowingsInputInput = {
    update: WithoutInput_98AndUserUncheckedUpdateWithoutFollowingsInputInput;
    create: WithoutInput_32AndUserUncheckedCreateWithoutFollowingsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_98AndUserUncheckedUpdateWithoutFollowingsInputInput = {
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type StarUncheckedUpdateManyWithoutUserNestedInputInput = {
    create?: WithoutInput_34AndStarUncheckedCreateWithoutUserInputInput;
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
    update: WithoutInput_100AndStarUncheckedUpdateWithoutUserInputInput;
    create: WithoutInput_34AndStarUncheckedCreateWithoutUserInputInput;
};
export type WithoutInput_100AndStarUncheckedUpdateWithoutUserInputInput = {
    post?: PostUpdateOneWithoutStarsNestedInputInput;
    id?: t.String;
    postId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedUpdateManyWithoutStarNestedInputInput;
};
export type PostUpdateOneWithoutStarsNestedInputInput = {
    create?: WithoutInput_36AndPostUncheckedCreateWithoutStarsInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutStarsInputInput;
    upsert?: PostUpsertWithoutStarsInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_6AndWhereInput_7;
    update?: WithoutInput_102AndPostUncheckedUpdateWithoutStarsInputInput;
};
export type PostUpsertWithoutStarsInputInput = {
    update: WithoutInput_108AndPostUncheckedUpdateWithoutStarsInputInput;
    create: WithoutInput_36AndPostUncheckedCreateWithoutStarsInputInput;
    where?: PostWhereInputInput;
};
export type WithoutInput_108AndPostUncheckedUpdateWithoutStarsInputInput = {
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
    create?: WithoutInput_38AndUserUncheckedCreateWithoutPostsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPostsInputInput;
    upsert?: UserUpsertWithoutPostsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_110AndUserUncheckedUpdateWithoutPostsInputInput;
};
export type UserUpsertWithoutPostsInputInput = {
    update: WithoutInput_116AndUserUncheckedUpdateWithoutPostsInputInput;
    create: WithoutInput_38AndUserUncheckedCreateWithoutPostsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_116AndUserUncheckedUpdateWithoutPostsInputInput = {
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type FollowUncheckedUpdateManyWithoutFollowerNestedInputInput = {
    create?: WithoutInput_40AndFollowUncheckedCreateWithoutFollowerInputInput;
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
    update: WithoutInput_118AndFollowUncheckedUpdateWithoutFollowerInputInput;
    create: WithoutInput_40AndFollowUncheckedCreateWithoutFollowerInputInput;
};
export type WithoutInput_118AndFollowUncheckedUpdateWithoutFollowerInputInput = {
    followed?: UserUpdateOneRequiredWithoutFollowersNestedInputInput;
    id?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedUpdateManyWithoutFollowNestedInputInput;
};
export type UserUpdateOneRequiredWithoutFollowersNestedInputInput = {
    create?: WithoutInput_42AndUserUncheckedCreateWithoutFollowersInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInputInput;
    upsert?: UserUpsertWithoutFollowersInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_120AndUserUncheckedUpdateWithoutFollowersInputInput;
};
export type UserUpsertWithoutFollowersInputInput = {
    update: WithoutInput_126AndUserUncheckedUpdateWithoutFollowersInputInput;
    create: WithoutInput_42AndUserUncheckedCreateWithoutFollowersInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_126AndUserUncheckedUpdateWithoutFollowersInputInput = {
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type ActivityUncheckedUpdateManyWithoutUserNestedInputInput = {
    create?: WithoutInput_44AndActivityUncheckedCreateWithoutUserInputInput;
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
    update: WithoutInput_128AndActivityUncheckedUpdateWithoutUserInputInput;
    create: WithoutInput_44AndActivityUncheckedCreateWithoutUserInputInput;
};
export type WithoutInput_128AndActivityUncheckedUpdateWithoutUserInputInput = {
    post?: PostUpdateOneWithoutActivitiesNestedInputInput;
    star?: StarUpdateOneWithoutActivitiesNestedInputInput;
    follow?: FollowUpdateOneWithoutActivitiesNestedInputInput;
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    starId?: t.String;
    followId?: t.String;
};
export type PostUpdateOneWithoutActivitiesNestedInputInput = {
    create?: WithoutInput_46AndPostUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutActivitiesInputInput;
    upsert?: PostUpsertWithoutActivitiesInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_6AndWhereInput_7;
    update?: WithoutInput_130AndPostUncheckedUpdateWithoutActivitiesInputInput;
};
export type PostUpsertWithoutActivitiesInputInput = {
    update: WithoutInput_136AndPostUncheckedUpdateWithoutActivitiesInputInput;
    create: WithoutInput_46AndPostUncheckedCreateWithoutActivitiesInputInput;
    where?: PostWhereInputInput;
};
export type WithoutInput_136AndPostUncheckedUpdateWithoutActivitiesInputInput = {
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
    create?: WithoutInput_48AndPostViewUncheckedCreateWithoutPostInputInput;
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
    update: WithoutInput_138AndPostViewUncheckedUpdateWithoutPostInputInput;
    create: WithoutInput_48AndPostViewUncheckedCreateWithoutPostInputInput;
};
export type WithoutInput_138AndPostViewUncheckedUpdateWithoutPostInputInput = {
    viewedBy?: UserUpdateOneRequiredWithoutPerformedPostViewsNestedInputInput;
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type UserUpdateOneRequiredWithoutPerformedPostViewsNestedInputInput = {
    create?: WithoutInput_50AndUserUncheckedCreateWithoutPerformedPostViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPerformedPostViewsInputInput;
    upsert?: UserUpsertWithoutPerformedPostViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_140AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput;
};
export type UserUpsertWithoutPerformedPostViewsInputInput = {
    update: WithoutInput_146AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput;
    create: WithoutInput_50AndUserUncheckedCreateWithoutPerformedPostViewsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_146AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput = {
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
};
export type UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput = {
    create?: WithoutInput_52AndUserViewUncheckedCreateWithoutViewedByInputInput;
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
    update: WithoutInput_148AndUserViewUncheckedUpdateWithoutViewedByInputInput;
    create: WithoutInput_52AndUserViewUncheckedCreateWithoutViewedByInputInput;
};
export type WithoutInput_148AndUserViewUncheckedUpdateWithoutViewedByInputInput = {
    user?: UserUpdateOneRequiredWithoutPerformedUserViewsNestedInputInput;
    id?: t.Number;
    userId?: t.String;
    createdAt?: t.String;
};
export type UserUpdateOneRequiredWithoutPerformedUserViewsNestedInputInput = {
    create?: WithoutInput_54AndUserUncheckedCreateWithoutPerformedUserViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutPerformedUserViewsInputInput;
    upsert?: UserUpsertWithoutPerformedUserViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_150AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput;
};
export type UserUpsertWithoutPerformedUserViewsInputInput = {
    update: WithoutInput_156AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput;
    create: WithoutInput_54AndUserUncheckedCreateWithoutPerformedUserViewsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_156AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput = {
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
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput = {
    create?: WithoutInput_56AndPostViewUncheckedCreateWithoutViewedByInputInput;
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
    update: WithoutInput_158AndPostViewUncheckedUpdateWithoutViewedByInputInput;
    create: WithoutInput_56AndPostViewUncheckedCreateWithoutViewedByInputInput;
};
export type WithoutInput_158AndPostViewUncheckedUpdateWithoutViewedByInputInput = {
    post?: PostUpdateOneRequiredWithoutViewsNestedInputInput;
    id?: t.Number;
    postId?: t.String;
    createdAt?: t.String;
};
export type PostUpdateOneRequiredWithoutViewsNestedInputInput = {
    create?: WithoutInput_58AndPostUncheckedCreateWithoutViewsInputInput;
    connectOrCreate?: PostCreateOrConnectWithoutViewsInputInput;
    upsert?: PostUpsertWithoutViewsInputInput;
    connect?: WhereInput_6AndWhereInput_7;
    update?: WithoutInput_160AndPostUncheckedUpdateWithoutViewsInputInput;
};
export type PostUpsertWithoutViewsInputInput = {
    update: WithoutInput_166AndPostUncheckedUpdateWithoutViewsInputInput;
    create: WithoutInput_58AndPostUncheckedCreateWithoutViewsInputInput;
    where?: PostWhereInputInput;
};
export type WithoutInput_166AndPostUncheckedUpdateWithoutViewsInputInput = {
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
    create?: WithoutInput_60AndActivityUncheckedCreateWithoutPostInputInput;
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
    update: WithoutInput_168AndActivityUncheckedUpdateWithoutPostInputInput;
    create: WithoutInput_60AndActivityUncheckedCreateWithoutPostInputInput;
};
export type WithoutInput_168AndActivityUncheckedUpdateWithoutPostInputInput = {
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInputInput;
    star?: StarUpdateOneWithoutActivitiesNestedInputInput;
    follow?: FollowUpdateOneWithoutActivitiesNestedInputInput;
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    starId?: t.String;
    followId?: t.String;
};
export type UserUpdateOneRequiredWithoutActivitiesNestedInputInput = {
    create?: WithoutInput_62AndUserUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInputInput;
    upsert?: UserUpsertWithoutActivitiesInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_170AndUserUncheckedUpdateWithoutActivitiesInputInput;
};
export type UserUpsertWithoutActivitiesInputInput = {
    update: WithoutInput_176AndUserUncheckedUpdateWithoutActivitiesInputInput;
    create: WithoutInput_62AndUserUncheckedCreateWithoutActivitiesInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_176AndUserUncheckedUpdateWithoutActivitiesInputInput = {
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type UserViewUncheckedUpdateManyWithoutUserNestedInputInput = {
    create?: WithoutInput_64AndUserViewUncheckedCreateWithoutUserInputInput;
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
    update: WithoutInput_178AndUserViewUncheckedUpdateWithoutUserInputInput;
    create: WithoutInput_64AndUserViewUncheckedCreateWithoutUserInputInput;
};
export type WithoutInput_178AndUserViewUncheckedUpdateWithoutUserInputInput = {
    viewedBy?: UserUpdateOneRequiredWithoutReceivedUserViewsNestedInputInput;
    id?: t.Number;
    viewedById?: t.String;
    createdAt?: t.String;
};
export type UserUpdateOneRequiredWithoutReceivedUserViewsNestedInputInput = {
    create?: WithoutInput_66AndUserUncheckedCreateWithoutReceivedUserViewsInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutReceivedUserViewsInputInput;
    upsert?: UserUpsertWithoutReceivedUserViewsInputInput;
    connect?: WhereInput_27AndWhereInput_28;
    update?: WithoutInput_180AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput;
};
export type UserUpsertWithoutReceivedUserViewsInputInput = {
    update: WithoutInput_186AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput;
    create: WithoutInput_66AndUserUncheckedCreateWithoutReceivedUserViewsInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_186AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput = {
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
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type WithoutInput_180AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_186AndUserUncheckedUpdateWithoutReceivedUserViewsInputInput;
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
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type UserViewUpdateWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_21AndWhereInput_22;
    data: WithoutInput_178AndUserViewUncheckedUpdateWithoutUserInputInput;
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
export type WithoutInput_170AndUserUncheckedUpdateWithoutActivitiesInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_176AndUserUncheckedUpdateWithoutActivitiesInputInput;
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type StarUpdateOneWithoutActivitiesNestedInputInput = {
    create?: WithoutInput_68AndStarUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: StarCreateOrConnectWithoutActivitiesInputInput;
    upsert?: StarUpsertWithoutActivitiesInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_14AndWhereInput_15;
    update?: WithoutInput_189AndStarUncheckedUpdateWithoutActivitiesInputInput;
};
export type StarUpsertWithoutActivitiesInputInput = {
    update: WithoutInput_195AndStarUncheckedUpdateWithoutActivitiesInputInput;
    create: WithoutInput_68AndStarUncheckedCreateWithoutActivitiesInputInput;
    where?: StarWhereInputInput;
};
export type WithoutInput_195AndStarUncheckedUpdateWithoutActivitiesInputInput = {
    user?: UserUpdateOneRequiredWithoutStarredPostsNestedInputInput;
    post?: PostUpdateOneWithoutStarsNestedInputInput;
    id?: t.String;
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
};
export type WithoutInput_189AndStarUncheckedUpdateWithoutActivitiesInputInput = {
    user?: UserUpdateOneRequiredWithoutStarredPostsNestedInputInput;
    post?: PostUpdateOneWithoutStarsNestedInputInput;
    where?: StarWhereInputInput;
    data?: WithoutInput_195AndStarUncheckedUpdateWithoutActivitiesInputInput;
    id?: t.String;
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
};
export type FollowUpdateOneWithoutActivitiesNestedInputInput = {
    create?: WithoutInput_70AndFollowUncheckedCreateWithoutActivitiesInputInput;
    connectOrCreate?: FollowCreateOrConnectWithoutActivitiesInputInput;
    upsert?: FollowUpsertWithoutActivitiesInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_10AndWhereInput_11;
    update?: WithoutInput_197AndFollowUncheckedUpdateWithoutActivitiesInputInput;
};
export type FollowUpsertWithoutActivitiesInputInput = {
    update: WithoutInput_203AndFollowUncheckedUpdateWithoutActivitiesInputInput;
    create: WithoutInput_70AndFollowUncheckedCreateWithoutActivitiesInputInput;
    where?: FollowWhereInputInput;
};
export type WithoutInput_203AndFollowUncheckedUpdateWithoutActivitiesInputInput = {
    follower?: UserUpdateOneRequiredWithoutFollowingsNestedInputInput;
    followed?: UserUpdateOneRequiredWithoutFollowersNestedInputInput;
    id?: t.String;
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
};
export type WithoutInput_197AndFollowUncheckedUpdateWithoutActivitiesInputInput = {
    where?: FollowWhereInputInput;
    follower?: UserUpdateOneRequiredWithoutFollowingsNestedInputInput;
    followed?: UserUpdateOneRequiredWithoutFollowersNestedInputInput;
    data?: WithoutInput_203AndFollowUncheckedUpdateWithoutActivitiesInputInput;
    id?: t.String;
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
};
export type ActivityUpdateWithWhereUniqueWithoutPostInputInput = {
    where: WhereInput_18AndWhereInput_19;
    data: WithoutInput_168AndActivityUncheckedUpdateWithoutPostInputInput;
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
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    starId?: t.String;
    followId?: t.String;
};
export type ObjectAndActivityUncheckedUpdateManyWithoutPostInputInput = {
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    starId?: t.String;
    followId?: t.String;
};
export type WithoutInput_160AndPostUncheckedUpdateWithoutViewsInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    where?: PostWhereInputInput;
    data?: WithoutInput_166AndPostUncheckedUpdateWithoutViewsInputInput;
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
    data: WithoutInput_158AndPostViewUncheckedUpdateWithoutViewedByInputInput;
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
export type WithoutInput_150AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_156AndUserUncheckedUpdateWithoutPerformedUserViewsInputInput;
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
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type UserViewUpdateWithWhereUniqueWithoutViewedByInputInput = {
    where: WhereInput_21AndWhereInput_22;
    data: WithoutInput_148AndUserViewUncheckedUpdateWithoutViewedByInputInput;
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
export type WithoutInput_140AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_146AndUserUncheckedUpdateWithoutPerformedPostViewsInputInput;
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
};
export type PostViewUpdateWithWhereUniqueWithoutPostInputInput = {
    where: WhereInput_24AndWhereInput_25;
    data: WithoutInput_138AndPostViewUncheckedUpdateWithoutPostInputInput;
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
export type WithoutInput_130AndPostUncheckedUpdateWithoutActivitiesInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    where?: PostWhereInputInput;
    data?: WithoutInput_136AndPostUncheckedUpdateWithoutActivitiesInputInput;
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
    data: WithoutInput_128AndActivityUncheckedUpdateWithoutUserInputInput;
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
    starId?: t.String;
    followId?: t.String;
};
export type WithoutInput_120AndUserUncheckedUpdateWithoutFollowersInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_126AndUserUncheckedUpdateWithoutFollowersInputInput;
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type ActivityUncheckedUpdateManyWithoutFollowNestedInputInput = {
    create?: WithoutInput_72AndActivityUncheckedCreateWithoutFollowInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutFollowInputInput[];
    upsert?: ActivityUpsertWithWhereUniqueWithoutFollowInputInput[];
    createMany?: ActivityCreateManyFollowInputEnvelopeInput;
    set?: WhereInput_20AndWhereInput_19;
    disconnect?: WhereInput_20AndWhereInput_19;
    delete?: WhereInput_20AndWhereInput_19;
    connect?: WhereInput_20AndWhereInput_19;
    update?: ActivityUpdateWithWhereUniqueWithoutFollowInputInput[];
    updateMany?: ActivityUpdateManyWithWhereWithoutFollowInputInput[];
    deleteMany?: ActivityScalarWhereInputInput[];
};
export type ActivityUpsertWithWhereUniqueWithoutFollowInputInput = {
    where: WhereInput_18AndWhereInput_19;
    update: WithoutInput_210AndActivityUncheckedUpdateWithoutFollowInputInput;
    create: WithoutInput_72AndActivityUncheckedCreateWithoutFollowInputInput;
};
export type WithoutInput_210AndActivityUncheckedUpdateWithoutFollowInputInput = {
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInputInput;
    post?: PostUpdateOneWithoutActivitiesNestedInputInput;
    star?: StarUpdateOneWithoutActivitiesNestedInputInput;
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    starId?: t.String;
};
export type ActivityUpdateWithWhereUniqueWithoutFollowInputInput = {
    where: WhereInput_18AndWhereInput_19;
    data: WithoutInput_210AndActivityUncheckedUpdateWithoutFollowInputInput;
};
export type ActivityUpdateManyWithWhereWithoutFollowInputInput = {
    where: ActivityScalarWhereInputInput;
    data: ObjectAndActivityUncheckedUpdateManyWithoutFollowInputInput;
};
export type ObjectAndActivityUncheckedUpdateManyWithoutFollowInputInput = {
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    starId?: t.String;
};
export type FollowUpdateWithWhereUniqueWithoutFollowerInputInput = {
    where: WhereInput_10AndWhereInput_11;
    data: WithoutInput_118AndFollowUncheckedUpdateWithoutFollowerInputInput;
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
export type WithoutInput_110AndUserUncheckedUpdateWithoutPostsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_116AndUserUncheckedUpdateWithoutPostsInputInput;
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type WithoutInput_102AndPostUncheckedUpdateWithoutStarsInputInput = {
    user?: UserUpdateOneRequiredWithoutPostsNestedInputInput;
    where?: PostWhereInputInput;
    data?: WithoutInput_108AndPostUncheckedUpdateWithoutStarsInputInput;
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
export type ActivityUncheckedUpdateManyWithoutStarNestedInputInput = {
    create?: WithoutInput_74AndActivityUncheckedCreateWithoutStarInputInput;
    connectOrCreate?: ActivityCreateOrConnectWithoutStarInputInput[];
    upsert?: ActivityUpsertWithWhereUniqueWithoutStarInputInput[];
    createMany?: ActivityCreateManyStarInputEnvelopeInput;
    set?: WhereInput_20AndWhereInput_19;
    disconnect?: WhereInput_20AndWhereInput_19;
    delete?: WhereInput_20AndWhereInput_19;
    connect?: WhereInput_20AndWhereInput_19;
    update?: ActivityUpdateWithWhereUniqueWithoutStarInputInput[];
    updateMany?: ActivityUpdateManyWithWhereWithoutStarInputInput[];
    deleteMany?: ActivityScalarWhereInputInput[];
};
export type ActivityUpsertWithWhereUniqueWithoutStarInputInput = {
    where: WhereInput_18AndWhereInput_19;
    update: WithoutInput_214AndActivityUncheckedUpdateWithoutStarInputInput;
    create: WithoutInput_74AndActivityUncheckedCreateWithoutStarInputInput;
};
export type WithoutInput_214AndActivityUncheckedUpdateWithoutStarInputInput = {
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInputInput;
    post?: PostUpdateOneWithoutActivitiesNestedInputInput;
    follow?: FollowUpdateOneWithoutActivitiesNestedInputInput;
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    followId?: t.String;
};
export type ActivityUpdateWithWhereUniqueWithoutStarInputInput = {
    where: WhereInput_18AndWhereInput_19;
    data: WithoutInput_214AndActivityUncheckedUpdateWithoutStarInputInput;
};
export type ActivityUpdateManyWithWhereWithoutStarInputInput = {
    where: ActivityScalarWhereInputInput;
    data: ObjectAndActivityUncheckedUpdateManyWithoutStarInputInput;
};
export type ObjectAndActivityUncheckedUpdateManyWithoutStarInputInput = {
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    followId?: t.String;
};
export type StarUpdateWithWhereUniqueWithoutUserInputInput = {
    where: WhereInput_14AndWhereInput_15;
    data: WithoutInput_100AndStarUncheckedUpdateWithoutUserInputInput;
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
export type WithoutInput_92AndUserUncheckedUpdateWithoutFollowingsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_98AndUserUncheckedUpdateWithoutFollowingsInputInput;
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type FollowUpdateWithWhereUniqueWithoutFollowedInputInput = {
    where: WhereInput_10AndWhereInput_11;
    data: WithoutInput_90AndFollowUncheckedUpdateWithoutFollowedInputInput;
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
export type WithoutInput_82AndUserUncheckedUpdateWithoutStarredPostsInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_88AndUserUncheckedUpdateWithoutStarredPostsInputInput;
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
    receivedUserViews?: UserViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
    performedUserViews?: UserViewUncheckedUpdateManyWithoutUserNestedInputInput;
    performedPostViews?: PostViewUncheckedUpdateManyWithoutViewedByNestedInputInput;
};
export type StarUpdateWithWhereUniqueWithoutPostInputInput = {
    where: WhereInput_14AndWhereInput_15;
    data: WithoutInput_80AndStarUncheckedUpdateWithoutPostInputInput;
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
export type OmitInput_19 = {
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
    activities?: ActivityOrderByRelationAggregateInputInput;
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
export type OmitInput_26 = {
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
export type OmitInput_27 = {
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
export type ActivityOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    type?: SortOrderInput;
    createdAt?: SortOrderInput;
    userId?: SortOrderInput;
    postId?: t.String;
    starId?: t.String;
    followId?: t.String;
    user?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    post?: PostOrderByWithRelationAndSearchRelevanceInputInput;
    star?: StarOrderByWithRelationAndSearchRelevanceInputInput;
    follow?: FollowOrderByWithRelationAndSearchRelevanceInputInput;
    _relevance?: ActivityOrderByRelevanceInputInput;
};
export type FollowOrderByWithRelationAndSearchRelevanceInputInput = {
    id?: SortOrderInput;
    followerId?: SortOrderInput;
    followedId?: SortOrderInput;
    createdAt?: SortOrderInput;
    follower?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    followed?: UserOrderByWithRelationAndSearchRelevanceInputInput;
    activities?: ActivityOrderByRelationAggregateInputInput;
    _relevance?: FollowOrderByRelevanceInputInput;
};
export type FollowOrderByRelevanceInputInput = {
    fields: t.String;
    sort: SortOrderInput;
    search: t.String;
};
export type ActivityOrderByRelevanceInputInput = {
    fields: t.String;
    sort: SortOrderInput;
    search: t.String;
};
export type OmitInput_30 = {
    user?: UserCreateNestedOneWithoutStarredPostsInputInput;
    post?: PostCreateNestedOneWithoutStarsInputInput;
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutStarInputInput;
    postId?: t.String;
    userId?: t.String;
};
export type WithoutInput_4AndStarUncheckedUpdateInputInput = {
    user?: UserUpdateOneRequiredWithoutStarredPostsNestedInputInput;
    post?: PostUpdateOneWithoutStarsNestedInputInput;
    id?: t.String;
    postId?: t.String;
    userId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedUpdateManyWithoutStarNestedInputInput;
};
export type OmitInput_31 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    AND?: StarWhereInputInput[];
    OR?: StarWhereInputInput[];
    NOT?: StarWhereInputInput[];
    createdAt?: t.String;
    activities?: ActivityListRelationFilterInput;
    postId?: t.String;
    userId?: t.String;
    postId_userId?: StarPostIdUserIdCompoundUniqueInputInput;
};
export type OmitInput_34 = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    createdAt?: t.String;
    star?: StarCreateNestedOneWithoutActivitiesInputInput;
    postId?: t.String;
    userId?: t.String;
    type: t.String;
    starId?: t.String;
};
export type WithoutInput_6AndActivityUncheckedUpdateInputInput = {
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInputInput;
    post?: PostUpdateOneWithoutActivitiesNestedInputInput;
    star?: StarUpdateOneWithoutActivitiesNestedInputInput;
    follow?: FollowUpdateOneWithoutActivitiesNestedInputInput;
    id?: t.String;
    type?: t.String;
    createdAt?: t.String;
    userId?: t.String;
    postId?: t.String;
    starId?: t.String;
    followId?: t.String;
};
export type OmitInput_35 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    star?: WithoutInput_20AndStarWhereInputInput;
    postId?: t.String;
    userId?: t.String;
    type?: t.String;
    starId?: t.String;
};
export type OmitInput_32 = {
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutFollowInputInput;
    followerId?: t.String;
    followedId?: t.String;
    follower?: UserCreateNestedOneWithoutFollowingsInputInput;
    followed?: UserCreateNestedOneWithoutFollowersInputInput;
};
export type WithoutInput_2AndFollowUncheckedUpdateInputInput = {
    follower?: UserUpdateOneRequiredWithoutFollowingsNestedInputInput;
    followed?: UserUpdateOneRequiredWithoutFollowersNestedInputInput;
    id?: t.String;
    followerId?: t.String;
    followedId?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedUpdateManyWithoutFollowNestedInputInput;
};
export type OmitInput_33 = {
    AND?: FollowWhereInputInput[];
    OR?: FollowWhereInputInput[];
    NOT?: FollowWhereInputInput[];
    createdAt?: t.String;
    activities?: ActivityListRelationFilterInput;
    followerId?: t.String;
    followedId?: t.String;
    follower?: WithoutInput_16AndUserWhereInputInput;
    followed?: WithoutInput_16AndUserWhereInputInput;
    followerId_followedId?: FollowFollowerIdFollowedIdCompoundUniqueInputInput;
};
export type OmitInput_28 = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    userId?: t.String;
    type: t.String;
    follow?: FollowCreateNestedOneWithoutActivitiesInputInput;
    followId?: t.String;
};
export type OmitInput_29 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    post?: WithoutInput_18AndPostWhereInputInput;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    postId?: t.String;
    userId?: t.String;
    type?: t.String;
    follow?: WithoutInput_22AndFollowWhereInputInput;
    followId?: t.String;
};
export type OmitInput_20 = {
    user?: UserCreateNestedOneWithoutStarredPostsInputInput;
    id?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutStarInputInput;
    userId?: t.String;
};
export type OmitInput_21 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    AND?: StarWhereInputInput[];
    OR?: StarWhereInputInput[];
    NOT?: StarWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    activities?: ActivityListRelationFilterInput;
    userId?: t.String;
    postId_userId?: StarPostIdUserIdCompoundUniqueInputInput;
};
export type OmitInput_22 = {
    user?: UserCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    createdAt?: t.String;
    star?: StarCreateNestedOneWithoutActivitiesInputInput;
    userId?: t.String;
    type: t.String;
    follow?: FollowCreateNestedOneWithoutActivitiesInputInput;
    starId?: t.String;
    followId?: t.String;
};
export type OmitInput_23 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    star?: WithoutInput_20AndStarWhereInputInput;
    userId?: t.String;
    type?: t.String;
    follow?: WithoutInput_22AndFollowWhereInputInput;
    starId?: t.String;
    followId?: t.String;
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
export type OmitInput_24 = {
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
export type OmitInput_25 = {
    AND?: PostViewWhereInputInput[];
    OR?: PostViewWhereInputInput[];
    NOT?: PostViewWhereInputInput[];
    id?: t.Number;
    createdAt?: t.String;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
    viewedById?: t.String;
};
export type OmitInput_36 = {
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
    receivedUserViews?: UserViewUncheckedCreateNestedManyWithoutViewedByInputInput;
    performedUserViews?: UserViewUncheckedCreateNestedManyWithoutUserInputInput;
    performedPostViews?: PostViewUncheckedCreateNestedManyWithoutViewedByInputInput;
};
export type OmitInput_37 = {
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
export type OmitInput_4 = {
    id?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutFollowInputInput;
    followerId?: t.String;
    follower?: UserCreateNestedOneWithoutFollowingsInputInput;
};
export type OmitInput_5 = {
    AND?: FollowWhereInputInput[];
    OR?: FollowWhereInputInput[];
    NOT?: FollowWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    activities?: ActivityListRelationFilterInput;
    followerId?: t.String;
    follower?: WithoutInput_16AndUserWhereInputInput;
    followerId_followedId?: FollowFollowerIdFollowedIdCompoundUniqueInputInput;
};
export type OmitInput_6 = {
    id?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutFollowInputInput;
    followedId?: t.String;
    followed?: UserCreateNestedOneWithoutFollowersInputInput;
};
export type OmitInput_7 = {
    AND?: FollowWhereInputInput[];
    OR?: FollowWhereInputInput[];
    NOT?: FollowWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    activities?: ActivityListRelationFilterInput;
    followedId?: t.String;
    followed?: WithoutInput_16AndUserWhereInputInput;
    followerId_followedId?: FollowFollowerIdFollowedIdCompoundUniqueInputInput;
};
export type OmitInput_8 = {
    post?: PostCreateNestedOneWithoutStarsInputInput;
    id?: t.String;
    createdAt?: t.String;
    activities?: ActivityUncheckedCreateNestedManyWithoutStarInputInput;
    postId?: t.String;
};
export type OmitInput_9 = {
    post?: WithoutInput_18AndPostWhereInputInput;
    AND?: StarWhereInputInput[];
    OR?: StarWhereInputInput[];
    NOT?: StarWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    activities?: ActivityListRelationFilterInput;
    postId?: t.String;
    postId_userId?: StarPostIdUserIdCompoundUniqueInputInput;
};
export type OmitInput_10 = {
    post?: PostCreateNestedOneWithoutActivitiesInputInput;
    id?: t.String;
    createdAt?: t.String;
    star?: StarCreateNestedOneWithoutActivitiesInputInput;
    postId?: t.String;
    type: t.String;
    follow?: FollowCreateNestedOneWithoutActivitiesInputInput;
    starId?: t.String;
    followId?: t.String;
};
export type OmitInput_11 = {
    post?: WithoutInput_18AndPostWhereInputInput;
    AND?: ActivityWhereInputInput[];
    OR?: ActivityWhereInputInput[];
    NOT?: ActivityWhereInputInput[];
    id?: t.String;
    createdAt?: t.String;
    star?: WithoutInput_20AndStarWhereInputInput;
    postId?: t.String;
    type?: t.String;
    follow?: WithoutInput_22AndFollowWhereInputInput;
    starId?: t.String;
    followId?: t.String;
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
export type OmitInput_12 = {
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
export type OmitInput_13 = {
    user?: WithoutInput_16AndUserWhereInputInput;
    AND?: UserViewWhereInputInput[];
    OR?: UserViewWhereInputInput[];
    NOT?: UserViewWhereInputInput[];
    id?: t.Number;
    createdAt?: t.String;
    userId?: t.String;
};
export type OmitInput_14 = {
    id?: t.Number;
    createdAt?: t.String;
    viewedBy?: UserCreateNestedOneWithoutReceivedUserViewsInputInput;
    viewedById?: t.String;
};
export type OmitInput_15 = {
    AND?: UserViewWhereInputInput[];
    OR?: UserViewWhereInputInput[];
    NOT?: UserViewWhereInputInput[];
    id?: t.Number;
    createdAt?: t.String;
    viewedBy?: WithoutInput_16AndUserWhereInputInput;
    viewedById?: t.String;
};
export type OmitInput_16 = {
    post?: PostCreateNestedOneWithoutViewsInputInput;
    id?: t.Number;
    createdAt?: t.String;
    postId?: t.String;
};
export type OmitInput_17 = {
    post?: WithoutInput_24AndPostWhereInputInput;
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
    constructor() { this.__typename = ""; this.profile = proxy(Profile); this.featuredPosts = proxy(Connection_1); this.isFollowed = false; this.id = ""; this.organization = fnProxy(Organization); this.posts = fnProxy(Connection_1); this.post = fnProxy(Post); this.followers = fnProxy(Connection_2); this.follower = fnProxy(Follow); this.followings = fnProxy(Connection_2); this.following = fnProxy(Follow); this.starredPosts = fnProxy(Connection_3); this.starredPost = fnProxy(Star); this.bio = null; this.createdAt = ""; this.updatedAt = ""; this.activities = fnProxy(Connection_4); this.activitie = fnProxy(Activity); this.language = null; this.receivedUserViews = fnProxy(Connection_5); this.receivedUserView = fnProxy(UserView); this.performedUserViews = fnProxy(Connection_5); this.performedUserView = fnProxy(UserView); this.performedPostViews = fnProxy(Connection_6); this.performedPostView = fnProxy(PostView); }
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
    activities: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: ActivityWhereInputInput;
        orderBy?: ActivityOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_4;
    activitie: (args?: {
        where?: ActivityWhereInputInput;
    }) => Activity;
    constructor() { this.__typename = ""; this.id = ""; this.user = fnProxy(User); this.post = fnProxy(Post); this.createdAt = ""; this.activities = fnProxy(Connection_4); this.activitie = fnProxy(Activity); }
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
    type: t.String;
    createdAt: t.Date;
    user: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => User;
    post: (args?: {
        where?: PostWhereInputInput;
        orderBy?: PostOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => t.Nullable<Post>;
    star: (args?: {
        where?: StarWhereInputInput;
        orderBy?: StarOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => t.Nullable<Star>;
    follow: (args?: {
        where?: FollowWhereInputInput;
        orderBy?: FollowOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => t.Nullable<Follow>;
    constructor() { this.__typename = ""; this.id = ""; this.type = ""; this.createdAt = ""; this.user = fnProxy(User); this.post = fnProxy(Post); this.star = fnProxy(Star); this.follow = fnProxy(Follow); }
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
    activities: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: ActivityWhereInputInput;
        orderBy?: ActivityOrderByWithRelationAndSearchRelevanceInputInput[];
    }) => Connection_4;
    activitie: (args?: {
        where?: ActivityWhereInputInput;
    }) => Activity;
    constructor() { this.__typename = ""; this.id = ""; this.follower = fnProxy(User); this.followed = fnProxy(User); this.createdAt = ""; this.activities = fnProxy(Connection_4); this.activitie = fnProxy(Activity); }
}
export class Edge_3 {
    __typename: t.String;
    cursor: t.String;
    node: Activity;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(Activity); }
}
export class PageInfo {
    __typename: t.String;
    hasNextPage: t.Boolean;
    hasPreviousPage: t.Boolean;
    startCursor: t.Nullable<t.String>;
    endCursor: t.Nullable<t.String>;
    constructor() { this.__typename = ""; this.hasNextPage = false; this.hasPreviousPage = false; this.startCursor = null; this.endCursor = null; }
}
export class Edge_2 {
    __typename: t.String;
    cursor: t.String;
    node: Star;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(Star); }
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

