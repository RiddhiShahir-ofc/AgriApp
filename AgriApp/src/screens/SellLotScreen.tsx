// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import api from "../services/api";
// import { useTheme } from "../context/ThemeContext";
// import { useLanguage } from "../context/LanguageContext";

// export default function SellLotScreen() {
//   const route = useRoute<any>();
//   const navigation = useNavigation();
//   const { liveAuctionLotId, lot } = route.params;

//   const { theme } = useTheme();
//   const { t } = useLanguage();

//   const [price, setPrice] = useState("");
//   const [query, setQuery] = useState("");
//   const [buyers, setBuyers] = useState<any[]>([]);
//   const [selectedBuyer, setSelectedBuyer] = useState<any | null>(null);
//   const [loading, setLoading] = useState(false);

//   // ---------------- SEARCH BUYERS ----------------
//   const searchBuyers = async () => {
//     if (query.length < 3) {
//       Alert.alert(t("error_title") ?? "Error", t("min_3_chars") ?? "Enter at least 3 characters");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await api.get("/mandiOfficialAuction/buyers/search", {
//         params: { query },
//       });
//       setBuyers(res.data ?? []);
//     } catch {
//       Alert.alert(t("error_title") ?? "Error", t("buyer_search_failed") ?? "Buyer search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- SELL LOT ----------------
//   const handleSell = async () => {
//     if (!price) {
//       Alert.alert(t("error_title") ?? "Error", t("price_required") ?? "Enter final price");
//       return;
//     }

//     try {
//       await api.patch(
//         `/mandi/auction/liveLot/${liveAuctionLotId}/status`,
//         {
//           status: "sold",
//           finalPrice: Number(price),
//           buyerId: selectedBuyer?.buyerId ?? null,
//           buyerName: selectedBuyer?.name ?? query,
//           buyerMobile: selectedBuyer?.mobileNumber ?? null,
//         }
//       );

//       Alert.alert(
//         t("success_title") ?? "Success",
//         t("lot_sold_success") ?? "Lot marked as sold"
//       );

//       navigation.goBack();
//     } catch (err: any) {
//       Alert.alert(
//         t("error_title") ?? "Error",
//         err.response?.data?.message ?? "Failed to sell lot"
//       );
//     }
//   };

//   // ---------------- MARK UNSOLD ----------------
//   const handleUnsold = async () => {
//     try {
//       await api.patch(`/mandi/auction/liveLot/${liveAuctionLotId}/status`, {
//         status: "unsold",
//       });

//       Alert.alert(
//         t("success_title") ?? "Success",
//         t("lot_unsold") ?? "Lot marked as unsold"
//       );

//       navigation.goBack();
//     } catch {
//       Alert.alert(t("error_title") ?? "Error", "Failed to mark unsold");
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <Text style={[styles.header, { color: theme.text }]}>
//         {t("sell_lot") ?? "Sell Lot"}
//       </Text>

//       <TextInput
//         style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//         placeholder={t("search_buyer") ?? "Search buyer by name / mobile"}
//         placeholderTextColor="#9ca3af"
//         value={query}
//         onChangeText={setQuery}
//       />

//       <TouchableOpacity
//         style={[styles.searchBtn, { backgroundColor: theme.primary }]}
//         onPress={searchBuyers}
//       >
//         <Text style={{ color: "#fff", fontWeight: "700" }}>
//           {t("search") ?? "Search"}
//         </Text>
//       </TouchableOpacity>

//       {loading && <ActivityIndicator />}

//       <FlatList
//         data={buyers}
//         keyExtractor={(i, idx) => String(idx)}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.buyerItem,
//               {
//                 borderColor:
//                   selectedBuyer?.buyerId === item.buyerId
//                     ? theme.primary
//                     : theme.text,
//               },
//             ]}
//             onPress={() => setSelectedBuyer(item)}
//           >
//             <Text style={{ color: theme.text }}>
//               {item.name ?? t("not_buyer") ?? "Not a buyer"}
//             </Text>
//             <Text style={{ color: theme.text }}>
//               {item.mobileNumber}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />

//       <Text style={{ color: theme.text }}>
//         {t("crop")}: {lot.cropName}
//       </Text>

//       <Text style={{ color: theme.text }}>
//         {t("quantity")}: {lot.quantity}
//       </Text>

//       <TextInput
//         style={[styles.input, { borderColor: theme.text, color: theme.text }]}
//         placeholder={t("final_price") ?? "Final Price"}
//         placeholderTextColor="#9ca3af"
//         keyboardType="numeric"
//         value={price}
//         onChangeText={setPrice}
//       />


//       <TouchableOpacity
//         style={[styles.sellBtn, { backgroundColor: "#16a34a" }]}
//         onPress={handleSell}
//       >
//         <Text style={styles.btnText}>{t("sell") ?? "Sell"}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.unsoldBtn]}
//         onPress={handleUnsold}
//       >
//         <Text style={styles.btnText}>{t("mark_unsold") ?? "Mark Unsold"}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   header: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
//   input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 10,
//   },
//   searchBtn: {
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   buyerItem: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 6,
//   },
//   sellBtn: {
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 12,
//   },
//   unsoldBtn: {
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//     backgroundColor: "#ef4444",
//   },
//   btnText: { color: "#fff", fontWeight: "700" },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function SellLotScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { liveAuctionLotId, lot } = route.params;

  const { theme } = useTheme();
  const { t } = useLanguage();

  const [price, setPrice] = useState("");
  const [query, setQuery] = useState("");
  const [buyers, setBuyers] = useState<any[]>([]);
  const [selectedBuyer, setSelectedBuyer] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // ---------------- SEARCH BUYERS ----------------
  const searchBuyers = async () => {
    if (query.trim().length < 3) {
      Alert.alert(
        t("error_title") ?? "Error",
        t("min_3_chars") ?? "Enter at least 3 characters"
      );
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/mandiOfficialAuction/buyers/search", {
        params: { query },
      });
      setBuyers(res.data ?? []);
    } catch {
      Alert.alert(
        t("error_title") ?? "Error",
        t("buyer_search_failed") ?? "Buyer search failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SELL LOT ----------------
  const handleSell = async () => {
    if (!price) {
      Alert.alert(
        t("error_title") ?? "Error",
        t("price_required") ?? "Enter final price"
      );
      return;
    }

    try {
      await api.patch(
        `mandiOfficialAuction/mandi/auction/liveLot/${liveAuctionLotId}/status`,
        {
          status: "sold",
          finalPrice: Number(price),
          buyerId: selectedBuyer?.buyerId ?? null,
          buyerName:
            selectedBuyer?.name ??
            (selectedBuyer?.resultType === "NOT_BUYER" ? query : null),
          buyerMobile: selectedBuyer?.mobileNumber ?? null,
        }
      );

      Alert.alert(
        t("success_title") ?? "Success",
        t("lot_sold_success") ?? "Lot marked as sold"
      );

      navigation.goBack();
    } catch (err: any) {
      Alert.alert(
        t("error_title") ?? "Error",
        err.response?.data?.message ?? "Failed to sell lot"
      );
    }
  };

  // ---------------- MARK UNSOLD ----------------
  const handleUnsold = async () => {
    try {
      await api.patch(`mandiOfficialAuction/mandi/auction/liveLot/${liveAuctionLotId}/status`, {
        status: "unsold",
      });

      Alert.alert(
        t("success_title") ?? "Success",
        t("lot_unsold") ?? "Lot marked as unsold"
      );

      navigation.goBack();
    } catch {
      Alert.alert(
        t("error_title") ?? "Error",
        t("mark_unsold_failed") ?? "Failed to mark unsold"
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>
        {t("sell_lot") ?? "Sell Lot"}
      </Text>

      {/* SEARCH BUYER */}
      <TextInput
        style={[styles.input, { borderColor: theme.text, color: theme.text }]}
        placeholder={t("search_buyer") ?? "Search buyer by name / mobile"}
        placeholderTextColor="#9ca3af"
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity
        style={[styles.searchBtn, { backgroundColor: theme.primary }]}
        onPress={searchBuyers}
      >
        <Text style={styles.btnText}>
          {t("search") ?? "Search"}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator />}

      {/* BUYER SEARCH RESULTS */}
      <FlatList
        data={buyers}
        keyExtractor={(item, idx) => String(item.buyerId ?? idx)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.buyerItem,
              {
                borderColor:
                  selectedBuyer?.buyerId === item.buyerId
                    ? theme.primary
                    : theme.text,
              },
            ]}
            onPress={() => setSelectedBuyer(item)}
          >
            <Text style={{ color: theme.text, fontWeight: "700" }}>
              {item.name ?? (t("not_buyer") ?? "Not a buyer")}
            </Text>
            <Text style={{ color: theme.text }}>
              {item.mobileNumber}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/*  SELECTED BUYER DETAILS */}
      {selectedBuyer && (
        <View style={[styles.selectedBuyerBox, { borderColor: theme.primary }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t("selected_buyer") ?? "Selected Buyer"}
          </Text>

          <Text style={{ color: theme.text }}>
            {t("name") ?? "Name"}:{" "}
            {selectedBuyer.name ??
              (t("not_buyer") ?? "Non-app buyer")}
          </Text>

          <Text style={{ color: theme.text }}>
            {t("mobile") ?? "Mobile"}: {selectedBuyer.mobileNumber}
          </Text>
        </View>
      )}

      {/* LOT DETAILS */}
      <Text style={{ color: theme.text }}>
        {t("crop") ?? "Crop"}: {lot.cropName}
      </Text>
      <Text style={{ color: theme.text }}>
        {t("quantity") ?? "Quantity"}: {lot.quantity}
      </Text>
       <Text style={{ color: theme.text }}>
        {t("grade") ?? "Grade"}: {lot.grade}
      </Text>

      {/* FINAL PRICE */}
      <TextInput
        style={[styles.input, { borderColor: theme.text, color: theme.text }]}
        placeholder={t("final_price") ?? "Final Price"}
        placeholderTextColor="#9ca3af"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {/* ACTION BUTTONS */}
      <TouchableOpacity
        style={[styles.sellBtn, { backgroundColor: "#16a34a" }]}
        onPress={handleSell}
      >
        <Text style={styles.btnText}>
          {t("sell") ?? "Sell"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.unsoldBtn]}
        onPress={handleUnsold}
      >
        <Text style={styles.btnText}>
          {t("mark_unsold") ?? "Mark Unsold"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },

  searchBtn: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },

  buyerItem: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },

  selectedBuyerBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 6,
  },

  sellBtn: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#16a34a",
  },

  unsoldBtn: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#ef4444",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});
