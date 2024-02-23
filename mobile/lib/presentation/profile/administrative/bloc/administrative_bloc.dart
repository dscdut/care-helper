import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';


part 'administrative_event.dart';
part 'administrative_state.dart';

class AdministrativeBloc
    extends Bloc<AdministrativeEvent, AdministrativeState> {
  AdministrativeBloc() : super(AdministrativeInitial()) {
    on<AdministrativeEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
