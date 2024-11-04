import { windowHeight } from "@/helpers/normalize-font";
import { useAuthStore } from "@/store/auth";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { FeedItem } from "@tape.xyz/lens/gql";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Header } from "./header";
import { Item } from "./item";
import { feedQuery } from "./queries";

export const List = () => {
  const height = windowHeight * 0.75;

  const profileId = useAuthStore((state) => state.session.id);
  const { data, isLoading, refetch } = useInfiniteQuery(
    feedQuery(profileId ?? "")
  );
  const allPublications = data?.pages.flatMap(
    (page) => page.feed.items
  ) as FeedItem[];

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <FlashList
        scrollsToTop
        pagingEnabled
        removeClippedSubviews
        refreshing={isLoading}
        data={allPublications}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        snapToInterval={height}
        estimatedItemSize={height}
        onRefresh={() => refetch()}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});