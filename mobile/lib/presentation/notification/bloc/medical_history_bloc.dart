import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'medical_history_event.dart';
part 'medical_history_state.dart';

class MedicalHistoryBloc extends Bloc<MedicalHistoryEvent, MedicalHistoryState> {
  MedicalHistoryBloc() : super(const MedicalHistoryState()) {
    on<MedicalHistoryEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
