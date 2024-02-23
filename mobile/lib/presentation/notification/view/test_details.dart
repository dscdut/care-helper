import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/presentation/notification/bloc/medical_history_bloc.dart';
import 'package:flutter_template/presentation/widgets/common_app_bar.dart';

class TestDetailPage extends StatefulWidget {
  const TestDetailPage({super.key});

  @override
  _TestDetailPageState createState() => _TestDetailPageState();
}

class _TestDetailPageState extends State<TestDetailPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CommonAppBar(
        title: 'Test Details',
        hasBoxDecoration: false,
      ),
      body: Column(
        children: [
          _buildSectionTitle('Test details'),
          _buildTestDetailItem(),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Row(
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 23,
              fontFamily: 'Roboto',
              fontWeight: FontWeight.w600,
              color: Colors.black,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTestDetailItem() {
    return Container(
      margin: const EdgeInsets.only(left: 12, right: 12),
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
      decoration: BoxDecoration(
        color: ColorStyles.grey3,
        borderRadius: BorderRadius.circular(9.68),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          buildTestDetailRow(
            firstText: 'Metric',
            secondText: 'Index',
            thirdText: 'Unit',
          ),
          const Divider(
            color: Colors.black,
            thickness: 1,
          ),
          resultTestDetailRow(
            firstText: 'Blood Urea',
            secondText: '80',
            thirdText: 'mg/Dl',
          ),
          const Divider(
            color: Colors.white,
            thickness: 1,
          ),
          resultTestDetailRow(
            firstText: 'Blood Uric Acid',
            secondText: '80',
            thirdText: 'mg/Dl',
          ),
          const Divider(
            color: Colors.white,
            thickness: 1,
          ),
          resultTestDetailRow(
            firstText: 'Blood Creatinine',
            secondText: '80',
            thirdText: 'mg/Dl',
          ),
          const Divider(
            color: Colors.white,
            thickness: 1,
          ),
        ],
      ),
    );
  }

  Widget buildTestDetailRow({
    required String firstText,
    required String secondText,
    required String thirdText,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            flex: 3,
            child: Text(
              firstText,
              style: const TextStyle(
                fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight: FontWeight.w400,
                color: Colors.white,
                height: 1.2,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(right: 80),
            child: Expanded(
              flex: 2,
              child: Text(
                secondText,
                style: const TextStyle(
                  fontFamily: 'Roboto',
                  fontSize: 18,
                  fontWeight: FontWeight.w400,
                  color: Colors.white,
                  height: 1.2,
                ),
              ),
            ),
          ),
          Expanded(
            child: Text(
              thirdText,
              style: const TextStyle(
                fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight: FontWeight.w400,
                color: Colors.white,
                height: 1.2,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget resultTestDetailRow({
    required String firstText,
    required String secondText,
    required String thirdText,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            flex: 3,
            child: Text(
              firstText,
              style: const TextStyle(
                fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight: FontWeight.w400,
                color: Colors.black,
                height: 1.2,
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: Text(
              secondText,
              style: const TextStyle(
                fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight: FontWeight.w400,
                color: Colors.black,
                height: 1.2,
              ),
            ),
          ),
          Expanded(
            child: Text(
              thirdText,
              style: const TextStyle(
                fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight: FontWeight.w400,
                color: Colors.black,
                height: 1.2,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
