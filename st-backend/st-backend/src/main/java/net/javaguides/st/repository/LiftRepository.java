package net.javaguides.st.repository;

import net.javaguides.st.entity.Lift;
import org.springframework.data.jpa.repository.JpaRepository;

//Don't need to annotate with @Repository since SimpleJPARepository.class being extended already annotates it
//Addditionally, @Transactional is annotated so class will be exectured within a transaction. If transaction is successfully, changes will be commited to DB; Otherwise if error, transaction is rolled back and changed will not persist in DB
//extending JPArepository gets CRUD operations to be used on Lift entity
public interface LiftRepository extends JpaRepository<Lift, Long> { //Specify parameters, first is entity and second is var type for ID
}
