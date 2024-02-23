import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/presentation/notification/bloc/medical_history_bloc.dart';
import 'package:flutter_template/presentation/widgets/common_app_bar.dart';
import 'package:flutter_template/router/app_router.dart';

class MedicalHistoryPage extends StatelessWidget {
  const MedicalHistoryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => MedicalHistoryBloc(),
      child: const _MedicalHistoryView(),
    );
  }
}

class _MedicalHistoryView extends StatelessWidget {
  const _MedicalHistoryView();

  Widget _checkListhHeader(String text) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
      child: Row(
        children: [
          Text(
            text,
            textAlign: TextAlign.left,
            style: const TextStyle(
              fontSize: 40,
              fontFamily: 'Roboto',
              fontWeight: FontWeight.w700,
              color: Colors.black,
            ),
          ),
        ],
      ),
    );
  }

  Widget _theLatestCheckList(
    BuildContext context, // Add BuildContext parameter here
    String content,
    String date,
  ) {
    return Container(
      margin: const EdgeInsets.only(top: 10, left: 10, right: 10),
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
      decoration: BoxDecoration(
        color: ColorStyles.dodgerBlue,
        borderRadius: BorderRadius.circular(9.68),
      ),
      child: Row(
        children: [
          Expanded(
            child: Row(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 15, 0, 20),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        content,
                        style: const TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 22,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        date,
                        style: const TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 17,
                          fontWeight: FontWeight.w400,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
                const Spacer(),
                TextButton(
                  onPressed: () {
                    Navigator.pushNamedAndRemoveUntil(
                      context,
                      AppRouter.bloodPressure,
                      (route) => true,
                    );
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(
                      ColorStyles.deepBlue,
                    ),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  ),
                  child: const Row(
                    children: [
                      Icon(
                        Icons.alarm_sharp, // Biểu tượng hình đồng hồ
                        color: Colors.white,
                      ),
                      SizedBox(
                        width: 8,
                      ), // Khoảng cách giữa biểu tượng và văn bản
                      Text(
                        'Most recent',
                        style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 13,
                          fontWeight: FontWeight.w400,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _historyCheckList(
    String content,
    String date,
  ) {
    return Container(
      margin: const EdgeInsets.only(top: 10, left: 10, right: 10),
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
      decoration: BoxDecoration(
        color: ColorStyles.tundora,
        borderRadius: BorderRadius.circular(9.68),
      ),
      child: Row(
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(0, 15, 0, 20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    content,
                    style: const TextStyle(
                      fontFamily: 'Roboto',
                      fontSize: 24,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    date,
                    style: const TextStyle(
                      fontFamily: 'Roboto',
                      fontSize: 17,
                      fontWeight: FontWeight.w400,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MedicalHistoryBloc, MedicalHistoryState>(
      builder: (context, state) {
        return Scaffold(
          appBar: const CommonAppBar(
            title: ' ',
            toolbarHeight: 30,
          ),
          body: ListView.separated(
            separatorBuilder: (context, index) => const SizedBox(height: 10),
            itemCount: 20,
            itemBuilder: (context, index) {
              switch (index) {
                case 0:
                  return _checkListhHeader('History');
                case 1:
                  return _theLatestCheckList(
                    context, // Add context parameter here
                    'Stable',
                    '05/01/2024',
                  );
                case 2:
                  // Tạo một danh sách giả lập 5 lịch sử khám
                  final List<Map<String, String>> histories = [
                    {'content': 'Blood pressure stable', 'date': '14/12/2023'},
                    {'content': 'Blood pressure stable', 'date': '17/11/2023'},
                    {'content': 'Blood pressure stable', 'date': '24/10/2023'},
                    {'content': 'Blood pressure stable', 'date': '05/09/2023'},
                  ];
                  return Column(
                    children: histories.map((history) {
                      return _historyCheckList(
                        history['content']!,
                        history['date']!,
                      );
                    }).toList(),
                  );
              }
              return null;
            },
          ),
        );
      },
    );
  }
}
