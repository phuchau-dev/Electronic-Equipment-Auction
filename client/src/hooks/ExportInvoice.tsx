import {
  Font,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { Order } from "src/types/order/order";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",

});

const styles = StyleSheet.create({
  page: {
    padding: 10, // Giảm padding để vừa với khổ A6
    fontFamily: "Roboto",
  },
  section: {
    marginBottom: 5,
    fontSize: 12,
  },
  header: {
    fontSize: 14, // Giảm kích thước chữ cho tiêu đề
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    padding: 3, // Giảm padding để fit khổ A6
    fontSize: 8, // Giảm kích thước chữ để vừa với khổ A6
    textAlign: "center",
  },
  total: {
    textAlign: "right",
    marginTop: 10,
    fontSize: 12, // Giảm kích thước chữ cho tổng tiền
    fontWeight: "bold",
  },
});

const handleExportPDF = (order: Order) => {
  const MyDocument = () => (
    <Document>
      <Page size="A6" style={styles.page}>
        <Text style={styles.header}>Hóa Đơn Bán Hàng</Text>
        <View style={styles.section}>
          <Text>Mã đơn hàng: {order._id}</Text>
          <Text>Khách hàng: {order.shipping.recipientName || "Không có tên khách hàng"}</Text>
          <Text>Số điện thoại: {order.shipping.phoneNumber || "Chưa có số điện thoại"}</Text>
          <Text>Địa chỉ: {order.shipping.address || "Chưa có địa chỉ"}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>STT</Text>
            <Text style={styles.tableCell}>Tên sản phẩm</Text>
            <Text style={styles.tableCell}>Số lượng</Text>
            <Text style={styles.tableCell}>Giá</Text>
            <Text style={styles.tableCell}>Thành tiền</Text>
          </View>
          {order.cartDetails.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.items[0]?.productVariant?.variant_name || "Không có tên sản phẩm"}</Text>
              <Text style={styles.tableCell}>{item.items[0]?.quantity || 0}</Text>
              <Text style={styles.tableCell}>{item.items[0]?.productVariant?.variant_price.toLocaleString("vi-VN") || 0} VNĐ</Text>
              <Text style={styles.tableCell}>{order.totalPriceWithShipping?.toLocaleString("vi-VN")} VNĐ</Text>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Tổng tiền: {order.totalPriceWithShipping?.toLocaleString("vi-VN")} VNĐ</Text>
      </Page>
    </Document>
  );

  return pdf(<MyDocument />).toBuffer();
};
export default handleExportPDF;
