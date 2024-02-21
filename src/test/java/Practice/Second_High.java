package Practice;

public class Second_High {

	public static void main(String[] args) {
		int arr[]= {1,2,3,5,6,4,9,8,7,10};
		int temp;
		for(int i=0;i<arr.length;i++) {
			for(int j=0;j<arr.length;j++) {
				if(arr[i]<arr[j]) {
					temp=arr[j];
					arr[j]=arr[i];
					arr[i]=temp;
				}
			}
			System.out.println(arr.length-1);
			break;
		}
		

	}

}
