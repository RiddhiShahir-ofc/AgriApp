import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function ReadyForAuctionMap() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { arrivedLotId, mandiId } = route.params;

  const { theme } = useTheme();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState<any[]>([]);
  const [selectedAuctionId, setSelectedAuctionId] = useState<string>("");

  useEffect(() => {
    loadAuctions();
  }, []);

  const loadAuctions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/mandiOfficialAuction/mandi/auction/all", {
        params: { mandiId },
      });

      setAuctions(Array.isArray(res.data) ? res.data : []);
    // } catch (err) {
    //   console.log("Auction load error", err.response?.data ?? err);
    //   Alert.alert(t("error_title") ?? "Error", "Failed to load auction list");
    // } 
    }catch (err: unknown) {
  if (err && typeof err === "object" && "response" in err) {
    const apiErr = err as any;
    console.log("Auction load error", apiErr.response?.data??err);
     Alert.alert(t("error_title") ?? "Error", "Failed to load auction list");
  } else {
    console.log("Unexpected error:", err);
  }
}
    finally {
      setLoading(false);
    }
  };

  const handleReadyForAuction = async () => {
    if (!selectedAuctionId) {
      Alert.alert(t("error_title") ?? "Error", "Please select an auction");
      return;
    }

    try {
      await api.patch(`/mandi-official/lots/arrived/${arrivedLotId}/status`, {
        newStatus: "readyForAuction",
        auctionId: selectedAuctionId,
      });

      Alert.alert(
        t("success_title") ?? "Success",
        t("ready_for_auction_success") ?? "Lot moved to Ready For Auction"
      );

      navigation.goBack();
    } catch (err: any) {
      console.log("ReadyForAuction error", err.response?.data ?? err);
      Alert.alert(t("error_title") ?? "Error", err.response?.data?.message ?? "Failed to update status");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {t("map_to_auction") ?? "Map Lot to Auction"}
      </Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <>
          <Text style={[styles.label, { color: theme.text }]}>
            {t("select_auction") ?? "Select Auction"}
          </Text>

          <View style={[styles.pickerBox, { borderColor: theme.text }]}>
            <Picker
              selectedValue={selectedAuctionId}
              onValueChange={(v) => setSelectedAuctionId(v)}
            >
              <Picker.Item label={t("select_auction") ?? "Select auction"} value="" />
              {auctions.map((a) => (
                <Picker.Item
                  key={String(a.auctionId)}
                  label={`${a.cropName} - ${new Date(a.scheduledAt).toLocaleString()}`}
                  value={a.auctionId}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleReadyForAuction}>
            <Text style={styles.submitText}>
              {t("ready_for_auction") ?? "Ready For Auction"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 6 },
  pickerBox: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
