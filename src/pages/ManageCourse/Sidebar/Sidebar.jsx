import {
	faChevronDown,
	faChevronUp,
	faFileAlt,
	faHomeUser,
	faPlus,
	faQuestionCircle,
	faTasks,
	faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { addSection, updateSection } from '../../../redux/actions/sectionActions';
import styles from './Sidebar.module.css';

export default function Sidebar({ show, onSelectSection, onSelectContent, selectedContent }) {
	const sectionList = useSelector((state) => state.section);
	const dispatch = useDispatch();

	return (
		<div className={classNames(styles.sidebar, !show && styles.hideSidebar)}>
			<div
				className={styles.menuBox}
				onClick={() => {
					window.location.href = '/dashboard';
				}}>
				<FontAwesomeIcon icon={faHomeUser} className={styles.menuParticipantIcon} />
				<span>Kembali ke Dashboard</span>
			</div>
			<div>
				<div className={styles.menuTitleContainer}>
					<span className={styles.menuTitle}>Sesi Materi ({sectionList.section.length})</span>
					<FontAwesomeIcon
						icon={faPlus}
						className={styles.menuAddIcon}
						onClick={() => {
							const newSection = {
								title: '',
								sectionTitle: '',
								isDrillDown: true,
								content: [],
							};
							dispatch(addSection(newSection));
						}}
					/>
				</div>
				{sectionList.section.map((section) => {
					return (
						<>
							<div className={styles.menuCourseContainer} key={section.id}>
								<div
									className={styles.menuCourse}
									onClick={() => {
										dispatch(
											updateSection({
												...section,
												isDrillDown: !section.isDrillDown,
											})
										);
										onSelectSection(section);
										onSelectContent({});
									}}>
									<div className={styles.menuCourseTitle}>
										<span className={styles.menuCourseTitleSection}>
											{section.sectionTitle ? section.sectionTitle : 'Untitled Section'}
										</span>
										<span className={styles.menuCourseTitleCourse}>
											{section.title ? section.title : 'Untitled Course'}
										</span>
									</div>
									<div className={styles.menuCourseArrowContainer}>
										<FontAwesomeIcon
											icon={section.isDrillDown ? faChevronUp : faChevronDown}
											className={styles.menuArrowIcon}
										/>
									</div>
								</div>
							</div>
							{section.isDrillDown && (
								<div className={styles.modulContainer}>
									{section.content.map((content) => {
										return (
											<div
												key={content.id}
												className={classNames(
													styles.modulChild,
													content.id == selectedContent.id &&
														section.id == selectedContent.sectionId &&
														styles.modulChildSelected
												)}
												onClick={() => {
													onSelectSection(section);
													onSelectContent(content);
												}}>
												<span className={styles.modulType}>{content.type}</span>
												<div className={styles.modulContent}>
													<FontAwesomeIcon
														icon={
															content.type === 'video'
																? faVideo
																: content.type === 'materi'
																? faFileAlt
																: content.type === 'tugas'
																? faTasks
																: content.type === 'quiz'
																? faQuestionCircle
																: faVideo
														}
														className={styles.modulTypeIcon}
													/>
													<span className={styles.modulTitle}>
														{content.title ? content.title : 'Untitled Content'}
													</span>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</>
					);
				})}
			</div>
		</div>
	);
}
