import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/constants/hive_keys.dart';
import 'package:flutter_template/presentation/home/bloc/home_bloc.dart';
import 'package:flutter_template/presentation/home/widgets/alerts/new_survey_widget.dart';
import 'package:flutter_template/presentation/home/widgets/alerts/profile_incomplete_widget.dart';
import 'package:flutter_template/presentation/home/widgets/diagnostic/diagnostic_widget.dart';
import 'package:flutter_template/presentation/home/widgets/greetings/greetings_widget.dart';
import 'package:hive_flutter/hive_flutter.dart';

import 'package:flutter_template/presentation/home/widgets/prescription/prescription_widget.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => HomeBloc(),
      child: const _HomeView(),
    );
  }
}

class _HomeView extends StatelessWidget {
  const _HomeView();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HomeBloc, HomeState>(
      builder: (context, state) {
        return const Scaffold(
          body: SafeArea(
            child: SingleChildScrollView(
              padding: EdgeInsets.fromLTRB(20, 28, 20, 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  GreetingsWidget(name: 'Arthur Smith'),
                  SizedBox(height: 30),
                  NewSurveyWidget(),
                  // SizedBox(height: 16),
                  // ProfileIncompleteWidget(),
                  SizedBox(height: 30),
                  DiagnosticWidget(),
                  SizedBox(height: 30),
                  PrescriptionWidget(),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
