// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   FlatList,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../App";
// import api from "../services/api";
// import { useTheme } from "../context/ThemeContext";
// import { useLanguage } from "../context/LanguageContext";

// type NavProp = NativeStackNavigationProp<RootStackParamList, "LiveAuctionLots">;

// type RouteParams = { auctionId: string };

// export default function LiveAuctionLotsScreen() {
//   const navigation = useNavigation<NavProp>();
//   const route = useRoute();
//   const { auctionId } = route.params as RouteParams;

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [loading, setLoading] = useState(false);
//   const [lots, setLots] = useState<any[]>([]);

//   const loadLots = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get(
//         `/mandiOfficialAuction/mandi/auction/${auctionId}/liveAuctionLots`
//       );
//       setLots(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       Alert.alert(
//         t("error_title") ?? "Error",
//         t("fetch_live_lots_failed") ?? "Failed to fetch live auction lots"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadLots();
//   }, []);

//   const renderItem = ({ item }: { item: any }) => (
//     <View
//       style={[
//         styles.card,
//         { backgroundColor: theme.background, borderColor: theme.text },
//       ]}
//     >
//       <Text style={[styles.title, { color: theme.text }]}>
//         {t("lot_id")} {item.arrivedLotId}
//       </Text>
//       <Text style={{ color: theme.text }}>
//         {t("crop")}: {item.cropName}
//       </Text>
//       <Text style={{ color: theme.text }}>
//         {t("quantity")}: {item.quantity}
//       </Text>
//       <Text style={{ color: theme.text }}>
//         {t("grade_label")}: {item.grade}
//       </Text>
//       <Text style={{ color: theme.text, fontWeight: "700", marginTop: 4 }}>
//         {t("status")}: {item.auctionStatus}
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: theme.background }]}
//     >
//       <View style={{ padding: 16 }}>
//         <Text style={[styles.header, { color: theme.text }]}>
//           {t("live_lots") ?? "Live Auction Lots"}
//         </Text>
//         <Text style={{ color: theme.text, marginBottom: 10 }}>
//           {t("auctions") ?? "Auction"}: {auctionId}
//         </Text>
//       </View>

//       {loading ? (
//         <View style={styles.center}>
//           <ActivityIndicator />
//         </View>
//       ) : lots.length === 0 ? (
//         <View style={styles.center}>
//           <Text style={{ color: theme.text }}>
//             {t("no_live_lots") ?? "No lots mapped to this auction yet."}
//           </Text>
//         </View>
//       ) : (
//         <FlatList
//           data={lots}
//           keyExtractor={(it, idx) => String(it.arrivedLotId ?? idx)}
//           renderItem={renderItem}
//           contentContainerStyle={{ padding: 16 }}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: { fontSize: 22, fontWeight: "700" },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 12,
//   },
//   title: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
// });


import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import SellLotScreen from "./SellLotScreen";

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  "LiveAuctionLots"
>;

type RouteParams = { auctionId: string };

export default function LiveAuctionLotsScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute();
  const { auctionId } = route.params as RouteParams;

  const { theme } = useTheme();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [lots, setLots] = useState<any[]>([]);

  // ---------------- LOAD LOTS ----------------
  const loadLots = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/mandiOfficialAuction/mandi/auction/${auctionId}/liveAuctionLots`
      );

      setLots(Array.isArray(res.data) ? res.data : []);
    } catch (_err) {
      Alert.alert(
        t("error_title") ?? "Error",
        t("fetch_live_lots_failed") ??
          "Failed to fetch live auction lots"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load on mount
  useEffect(() => {
    loadLots();
  }, []);

  // Reload when coming back from SellLotScreen
  useFocusEffect(
    useCallback(() => {
      loadLots();
    }, [])
  );

  // ---------------- RENDER ITEM ----------------
  const renderItem = ({ item }: { item: any }) => {
    const canSell = item.auctionStatus === "pending";

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.background,
            borderColor: theme.text,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          {t("lot_id") ?? "Lot"} {item.arrivedLotId}
        </Text>
        <Text style={[styles.title, { color: theme.text }]}>
          {t("llot_id") ?? "Lot"} {item.liveAuctionLotId}
        </Text>

        <Text style={{ color: theme.text }}>
          {t("crop") ?? "Crop"}: {item.cropName}
        </Text>

        <Text style={{ color: theme.text }}>
          {t("quantity") ?? "Quantity"}: {item.quantity}
        </Text>

        <Text style={{ color: theme.text }}>
          {t("grade_label") ?? "Grade"}: {item.grade}
        </Text>

        <Text
          style={{
            color: theme.text,
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          {t("status") ?? "Status"}: {item.auctionStatus}
        </Text>

        {/* SELL LOT BUTTON */}
        {canSell && (
          <TouchableOpacity
            style={[
              styles.sellBtn,
              { backgroundColor: theme.primary },
            ]}
            onPress={() =>
              navigation.navigate("SellLotScreen" as any, {
                liveAuctionLotId: item.liveAuctionLotId,
                lot: item,
              })
            }
          >
            <Text style={styles.sellText}>
              {t("sell_lot") ?? "Sell Lot"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // ---------------- UI ----------------
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <View style={{ padding: 16 }}>
        <Text style={[styles.header, { color: theme.text }]}>
          {t("live_lots") ?? "Live Auction Lots"}
        </Text>

        <Text style={{ color: theme.text, marginBottom: 10 }}>
          {t("auction") ?? "Auction"}: {auctionId}
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : lots.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: theme.text }}>
            {t("no_live_lots") ??
              "No lots mapped to this auction yet."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={lots}
          keyExtractor={(it, idx) =>
            String(it.liveAuctionLotId ?? idx)
          }
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 22, fontWeight: "700" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  sellBtn: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  sellText: {
    color: "#fff",
    fontWeight: "700",
  },
});
