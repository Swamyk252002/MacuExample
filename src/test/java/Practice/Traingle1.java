package Practice;

public class Traingle1 {
	public static void main(String[] args) {
		
		int n=5;
		int m=1;
		for(int i=1;i<=n;i++) {
			for(int j=1;j<=i;j++) {		
				if(m>10) {
					break;
				}
				System.out.print(m);
				m=m+1;
			}
			System.out.println();
		}
		int num=0;
		for(int i=1;i<=100;i++) {
		num=num+i;
		System.out.println(i+" "+num);
		}
		System.out.println(num);

	}

}
